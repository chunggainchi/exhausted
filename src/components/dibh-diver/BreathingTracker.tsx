'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AppStatus, OpenCV } from '@/components/dibh-diver/types';
import { audioController } from './audio';

interface BreathingTrackerProps {
  onTrackingUpdate: (val: number) => void;
  setGlobalIsCVReady: (ready: boolean) => void;
  setGlobalIsTracking: (tracking: boolean) => void;
  globalCalibMin: number | null;
  globalCalibMax: number | null;
  setGlobalCalibMin: (val: number | null) => void;
  setGlobalCalibMax: (val: number | null) => void;
  onStartGame: () => void;
  onStreamReady: (stream: MediaStream) => void;
  onGhostCapture: (img: string | null) => void;
  ghostImage: string | null;
}

export default function BreathingTracker({
  onTrackingUpdate,
  setGlobalIsCVReady,
  setGlobalIsTracking,
  globalCalibMin,
  globalCalibMax,
  setGlobalCalibMin,
  setGlobalCalibMax,
  onStartGame,
  onStreamReady,
  onGhostCapture,
  ghostImage
}: BreathingTrackerProps) {

  const [status, setStatus] = useState<AppStatus>(AppStatus.LOADING_CV);
  const [cvLoaded, setCvLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [isRequestingCamera, setIsRequestingCamera] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const cameraRequestRef = useRef(false);

  // Accordion State for Mobile Workflow
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const requestRef = useRef<number | null>(null);
  const isTracking = useRef(false);
  const trackPoint = useRef<{ x: number; y: number } | null>(null);
  const matPrev = useRef<import('./types').Mat | null>(null);
  const matCurr = useRef<import('./types').Mat | null>(null);
  const point0 = useRef<import('./types').Mat | null>(null);
  const point1 = useRef<import('./types').Mat | null>(null);
  const winSize = useRef<import('./types').Size | null>(null);
  const criteria = useRef<import('./types').TermCriteria | null>(null);

  // --- INITIALIZATION ---
  const stopTracking = React.useCallback((lost = false) => {
    isTracking.current = false;
    setGlobalIsTracking(false);
    setStatus(lost ? AppStatus.LOST : AppStatus.READY);
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [setGlobalIsTracking]);

  const requestCameraAccess = React.useCallback(async () => {
    if (cameraRequestRef.current) return;
    if (!navigator?.mediaDevices?.getUserMedia) {
      setErrorMsg("Camera API not supported in this browser.");
      return;
    }
    cameraRequestRef.current = true;
    setIsRequestingCamera(true);
    setCameraReady(false);
    setErrorMsg(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false,
      });
      const videoEl = videoRef.current;
      if (!videoEl) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      const waitForMetadata = async () => {
        if (videoEl.readyState >= HTMLMediaElement.HAVE_METADATA) return;
        await new Promise<void>((resolve) => {
          const handler = () => {
            videoEl.removeEventListener('loadedmetadata', handler);
            resolve();
          };
          videoEl.addEventListener('loadedmetadata', handler, { once: true });
        });
      };
      videoEl.srcObject = stream;
      streamRef.current = stream;
      await waitForMetadata();
      if (canvasRef.current) {
        videoEl.width = videoEl.videoWidth;
        videoEl.height = videoEl.videoHeight;
        canvasRef.current.width = videoEl.videoWidth;
        canvasRef.current.height = videoEl.videoHeight;
      }
      try {
        await videoEl.play();
      } catch (playErr) {
        console.error("Play error:", playErr);
      }
      onStreamReady(stream);
      setCameraReady(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setErrorMsg("Camera permission denied. Please allow access and retry.");
        } else if (err.name === 'NotReadableError') {
          setErrorMsg("Camera is already in use by another application.");
        } else {
          setErrorMsg(err.message);
        }
      } else {
        setErrorMsg("Unable to start camera. Please retry.");
      }
    } finally {
      cameraRequestRef.current = false;
      setIsRequestingCamera(false);
    }
  }, [onStreamReady]);

  useEffect(() => {
    requestCameraAccess();

    const checkOpenCV = setInterval(() => {
      const cv = (window as unknown as { cv?: OpenCV }).cv;
      // @ts-expect-error truthiness check of library methods
      if (cv && cv.Mat && cv.calcOpticalFlowPyrLK) {
        clearInterval(checkOpenCV);
        setCvLoaded(true);
        setGlobalIsCVReady(true);
        setStatus(AppStatus.READY);
      }
    }, 100);

    return () => {
      clearInterval(checkOpenCV);
      cameraRequestRef.current = false;
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
      setCameraReady(false);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }

      try {
        if (matPrev.current) matPrev.current.delete();
        if (matCurr.current) matCurr.current.delete();
        if (point0.current) point0.current.delete();
        if (point1.current) point1.current.delete();
      } catch { /* ignore */ }
    };
  }, [onStreamReady, requestCameraAccess, setGlobalIsCVReady]);

  useEffect(() => {
    if (!ghostImage && isTracking.current) {
      stopTracking();
    }
  }, [ghostImage, stopTracking]);

  // --- AUTO-ADVANCE STEP LOGIC ---
  const step1Complete = !!ghostImage;
  const step2Complete = status === AppStatus.TRACKING;
  const step3Complete = globalCalibMin !== null && globalCalibMax !== null;

  useEffect(() => {
    if (!step1Complete) {
      setActiveStep(1);
    } else if (!step2Complete) {
      setActiveStep(2);
    } else if (!step3Complete) {
      setActiveStep(3);
    } else {
      setActiveStep(3);
    }
  }, [step1Complete, step2Complete, step3Complete]);


  // --- CV LOGIC ---
  const startTracking = (x: number, y: number) => {
    if (!window.cv || !videoRef.current) return;
    const cv = window.cv;
    const video = videoRef.current;

    if (video.width !== video.videoWidth) video.width = video.videoWidth;
    if (video.height !== video.videoHeight) video.height = video.videoHeight;
    const width = video.videoWidth;
    const height = video.videoHeight;
    if (width === 0 || height === 0) return;

    try {
      if (matPrev.current && (matPrev.current.cols !== width || matPrev.current.rows !== height)) {
        matPrev.current.delete(); matPrev.current = null;
      }
      if (matCurr.current && (matCurr.current.cols !== width || matCurr.current.rows !== height)) {
        matCurr.current.delete(); matCurr.current = null;
      }

      if (!matPrev.current) {
        matPrev.current = new cv.Mat(height, width, cv.CV_8UC1);
        matCurr.current = new cv.Mat(height, width, cv.CV_8UC1);
        point0.current = new cv.Mat(1, 1, cv.CV_32FC2);
        point1.current = new cv.Mat(1, 1, cv.CV_32FC2);
        winSize.current = new cv.Size(21, 21);
        criteria.current = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 30, 0.01);
      }

      point0.current!.data32F[0] = x;
      point0.current!.data32F[1] = y;
      trackPoint.current = { x, y };

      const cap = new cv.VideoCapture(video);
      const tempMat = new cv.Mat(height, width, cv.CV_8UC4);
      cap.read(tempMat);
      cv.cvtColor(tempMat, matPrev.current!, cv.COLOR_RGBA2GRAY);
      tempMat.delete();

      isTracking.current = true;
      setGlobalIsTracking(true);
      setStatus(AppStatus.TRACKING);

      requestRef.current = requestAnimationFrame(processVideo);
    } catch {
      console.error("Failed to start tracking");
      setStatus(AppStatus.LOST);
    }
  };

  const processVideo = () => {
    if (!isTracking.current || !videoRef.current || !window.cv) return;
    const cv = window.cv;
    const video = videoRef.current;

    if (video.videoWidth === 0) {
      requestRef.current = requestAnimationFrame(processVideo);
      return;
    }

    if (video.width !== video.videoWidth) video.width = video.videoWidth;
    if (video.height !== video.videoHeight) video.height = video.videoHeight;

    try {
      // The AudioContextClass line was misplaced and syntactically incorrect.
      // It's removed as it doesn't belong here and was causing a syntax error.
      // If audio context is needed, it should be initialized properly elsewhere.
      const tempMat = new cv.Mat(video.videoHeight, video.videoWidth, cv.CV_8UC4);
      const cap = new cv.VideoCapture(video);
      cap.read(tempMat);
      cv.cvtColor(tempMat, matCurr.current!, cv.COLOR_RGBA2GRAY);
      tempMat.delete();

      const statusMat = new cv.Mat();
      const errMat = new cv.Mat();

      cv.calcOpticalFlowPyrLK(
        matPrev.current!,
        matCurr.current!,
        point0.current!,
        point1.current!,
        statusMat,
        errMat,
        winSize.current!,
        3,
        criteria.current!
      );

      const statusVal = statusMat.data[0];

      if (statusVal === 1) {
        const newX = point1.current!.data32F[0];
        const newY = point1.current!.data32F[1];

        if (newX < 0 || newY < 0 || newX > video.videoWidth || newY > video.videoHeight) {
          stopTracking();
        } else {
          trackPoint.current = { x: newX, y: newY };
          onTrackingUpdate(newY);
          matCurr.current!.copyTo(matPrev.current!);
          point1.current!.copyTo(point0.current!);
          drawOverlay(newX, newY);
        }
      } else {
        stopTracking();
      }
      statusMat.delete();
      errMat.delete();
    } catch (e) { // Catch the error to prevent infinite loops on CV errors
      console.error("Error during video processing:", e);
      stopTracking();
    }

    // The `this.ambientOsc = null;` line was out of context and removed.
    if (isTracking.current) {
      requestRef.current = requestAnimationFrame(processVideo);
    }
  };



  const drawOverlay = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#4cc9f0';
    ctx.lineWidth = 4;
    ctx.strokeRect(x - 20, y - 20, 40, 40);

    ctx.beginPath();
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + 10, y);
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, y + 10);
    ctx.stroke();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (status !== AppStatus.READY && status !== AppStatus.LOST) return;
    if (!ghostImage) return;

    audioController.playClick();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const visualX = (e.clientX - rect.left) * scaleX;
    const visualY = (e.clientY - rect.top) * scaleY;
    const videoX = canvas.width - visualX; // Mirror logic
    const videoY = visualY;

    startTracking(videoX, videoY);
  };

  const captureGhost = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioController.playClick();
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const data = canvas.toDataURL('image/jpeg');
        onGhostCapture(data);
      }
    }
  };

  const handleStartGame = () => {
    audioController.init();
    audioController.playClick();
    onStartGame();
  };

  const toggleCalibMin = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioController.playClick();
    if (globalCalibMin !== null) {
      setGlobalCalibMin(null);
    } else {
      setGlobalCalibMin(trackPoint.current?.y || 0);
    }
  };

  const toggleCalibMax = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioController.playClick();
    if (globalCalibMax !== null) {
      setGlobalCalibMax(null);
    } else {
      setGlobalCalibMax(trackPoint.current?.y || 0);
    }
  };

  let videoOverlayText = "";
  let overlayColor = "text-white";

  if (!step1Complete) {
    videoOverlayText = "Make yourself comfortable";
  } else if (!step2Complete) {
    videoOverlayText = "Mark point to track breathing";
    overlayColor = "text-[#ff9f1c]";
  } else if (globalCalibMin === null) {
    videoOverlayText = "Breathe normally and click set";
    overlayColor = "text-[#4cc9f0]";
  } else if (globalCalibMax === null) {
    videoOverlayText = "Breathe deeply and click set";
    overlayColor = "text-[#4cc9f0]";
  } else {
    videoOverlayText = "Ready to Dive.";
    overlayColor = "text-[#06d6a0]";
  }

  const renderStartButton = (extraClass = '') => (
    <button
      disabled={!step3Complete}
      onClick={(e) => { e.stopPropagation(); handleStartGame(); }}
      className={`w-full py-4 md:py-6 text-xl md:text-3xl font-black italic uppercase tracking-widest border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] transition-all rounded-sm
        ${step3Complete ? 'bg-[#ff9f1c] text-[#0d2b45] animate-bounce-short' : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50 hidden'} ${extraClass}`}
    >
      Start Mission
    </button>
  );
  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] p-2 md:p-8 pb-28 md:pb-8 bg-[#0d2b45] overflow-y-auto">

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 md:gap-8 pb-8">

        <div className="text-center mt-2 hidden md:block">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#4cc9f0] to-[#0077b6] drop-shadow-[0_4px_0_rgba(255,255,255,0.1)] uppercase italic tracking-widest transform -skew-x-12">
            Prepare For Dive
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">

          <div className="w-full relative bg-black rounded-lg border-2 md:border-4 border-[#203c56] shadow-2xl aspect-[4/3] overflow-hidden group shrink-0">
            {(!cameraReady || !cvLoaded) && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[#0d2b45] text-[#4cc9f0] px-4 text-center">
                <div className="w-8 h-8 md:w-16 md:h-16 border-4 border-[#4cc9f0] border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-sm md:text-xl tracking-widest uppercase">
                  {!cameraReady ? 'Waiting for camera...' : 'Loading computer vision...'}
                </p>
                {!cameraReady && (
                  <>
                    <p className="text-xs md:text-base text-[#8da9c4]">
                      {errorMsg ?? 'Allow camera access so we can calibrate your breathing.'}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); requestCameraAccess(); }}
                      disabled={isRequestingCamera}
                      className="px-4 py-2 bg-[#4cc9f0] text-[#0d2b45] font-bold uppercase tracking-widest rounded shadow disabled:opacity-60"
                    >
                      {isRequestingCamera ? 'Requesting…' : 'Retry Camera'}
                    </button>
                  </>
                )}
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
            />

            {ghostImage && (
              <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
                <div className="relative w-full h-full">
                  <Image
                    src={ghostImage}
                    alt="ghost"
                    fill
                    sizes="100vw"
                    className="object-cover scale-x-[-1] filter grayscale contrast-125"
                  />
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full z-20 object-cover scale-x-[-1] touch-none ${status === AppStatus.READY || status === AppStatus.LOST ? 'cursor-crosshair' : 'cursor-none'}`}
              onClick={handleCanvasClick}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-2 md:p-4 z-40 border-t-2 border-[#203c56] flex flex-col items-center text-center transition-all duration-300">
              <p className={`text-sm md:text-xl font-black uppercase tracking-wider ${overlayColor} animate-pulse`}>
                {videoOverlayText}
              </p>
            </div>

            <div className="absolute top-2 left-2 z-30 pointer-events-none">
              <div className={`px-2 py-1 text-[10px] md:text-sm font-black uppercase border-l-4 shadow-lg backdrop-blur-md
                        ${status === AppStatus.TRACKING ? 'border-[#4cc9f0] bg-[#4cc9f0]/20 text-[#4cc9f0]' :
                  (status === AppStatus.READY ? 'border-[#ff9f1c] bg-[#ff9f1c]/20 text-[#ff9f1c]' : 'border-red-500 bg-red-500/20 text-red-500')}`}>
                {errorMsg ? errorMsg : status === AppStatus.TRACKING ? 'TRACKING' : (status === AppStatus.READY ? 'SEARCHING' : 'LOST')}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-6 bg-[#163853] p-2 md:p-8 rounded-lg border-2 border-[#203c56] shadow-xl">

            <div
              onClick={() => setActiveStep(1)}
              className={`rounded transition-all duration-300 overflow-hidden cursor-pointer ${activeStep === 1 ? 'bg-[#ff9f1c]/5 border-l-4 border-[#ff9f1c] p-4' : 'bg-[#0d2b45] p-3 border-l-4 border-[#4cc9f0] opacity-80'}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm md:text-2xl text-white uppercase flex items-center gap-2">
                  <span className="bg-white/10 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-base">1</span>
                  Camera Setup
                </h3>
                {step1Complete && <span className="text-[#4cc9f0] font-black text-[10px] md:text-sm tracking-widest border border-[#4cc9f0] px-2 rounded">DONE</span>}
              </div>

              {activeStep === 1 && (
                <div className="mt-4 animate-fade-in">
                  <p className="text-sm md:text-lg text-[#8da9c4] mb-4">
                    Sit comfortably upright. Ensure your chest is visible.
                  </p>
                  <button
                    onClick={ghostImage ? (e) => { e.stopPropagation(); audioController.playClick(); onGhostCapture(null); } : captureGhost}
                    className={`w-full py-3 md:py-4 font-bold uppercase tracking-widest text-xs md:text-base shadow-lg transition-all rounded-sm
                                  ${ghostImage ? 'bg-[#203c56] border-2 border-[#4cc9f0] text-[#4cc9f0]' : 'bg-[#ff9f1c] text-[#0d2b45]'}`}
                  >
                    {ghostImage ? 'Reset Position' : 'Lock Position'}
                  </button>
                </div>
              )}
            </div>

            <div
              onClick={() => step1Complete && setActiveStep(2)}
              className={`rounded transition-all duration-300 overflow-hidden ${!step1Complete ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} 
                    ${activeStep === 2 ? 'bg-[#ff9f1c]/5 border-l-4 border-[#ff9f1c] p-4' : 'bg-[#0d2b45] p-3 border-l-4 border-gray-600'}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm md:text-2xl text-white uppercase flex items-center gap-2">
                  <span className="bg-white/10 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-base">2</span>
                  SET TRACKING TARGET
                </h3>
                {step2Complete ? (
                  <span className="text-[#4cc9f0] font-black text-[10px] md:text-sm tracking-widest border border-[#4cc9f0] px-2 rounded">DONE</span>
                ) : (activeStep !== 2 && step1Complete && <span className="text-gray-500 text-[10px]">PENDING</span>)}
              </div>

              {activeStep === 2 && (
                <div className="mt-4 animate-fade-in">
                  <p className="text-sm md:text-lg text-[#8da9c4] mb-4">
                    Click a point on your chest (zipper, logo) that moves with your breathing motion.
                  </p>
                  {step2Complete && (
                    <button onClick={(e) => { e.stopPropagation(); audioController.playClick(); stopTracking(); }} className="w-full py-2 md:py-3 bg-[#203c56] border-2 border-[#4cc9f0] text-[#4cc9f0] font-bold uppercase text-xs md:text-sm rounded-sm">
                      Reselect Target
                    </button>
                  )}
                </div>
              )}
            </div>

            <div
              onClick={() => step2Complete && setActiveStep(3)}
              className={`rounded transition-all duration-300 overflow-hidden ${!step2Complete ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
                    ${activeStep === 3 ? 'bg-[#ff9f1c]/5 border-l-4 border-[#ff9f1c] p-4' : 'bg-[#0d2b45] p-3 border-l-4 border-gray-600'}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm md:text-2xl text-white uppercase flex items-center gap-2">
                  <span className="bg-white/10 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-base">3</span>
                  Set breathing levels
                </h3>
                {step3Complete && <span className="text-[#4cc9f0] font-black text-[10px] md:text-sm tracking-widest border border-[#4cc9f0] px-2 rounded">READY</span>}
              </div>

              {activeStep === 3 && (
                <div className="mt-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                    <button
                      onClick={toggleCalibMin}
                      className={`flex flex-col items-center justify-center p-2 md:p-4 border-2 font-bold uppercase shadow-lg transition-all rounded-sm h-20 md:h-32
                                      ${globalCalibMin
                          ? 'bg-[#203c56] border-[#4cc9f0] text-[#4cc9f0]'
                          : 'bg-[#ff9f1c] border-white text-[#0d2b45] animate-pulse'}`}
                    >
                      <span className="text-[10px] md:text-sm opacity-80 mb-1">Normal</span>
                      <span className="text-lg md:text-3xl">{globalCalibMin ? 'RESET' : 'SET'}</span>
                    </button>
                    <button
                      onClick={toggleCalibMax}
                      className={`flex flex-col items-center justify-center p-2 md:p-4 border-2 font-bold uppercase shadow-lg transition-all rounded-sm h-20 md:h-32
                                      ${globalCalibMax
                          ? 'bg-[#203c56] border-[#4cc9f0] text-[#4cc9f0]'
                          : (globalCalibMin ? 'bg-[#ff9f1c] border-white text-[#0d2b45] animate-pulse' : 'bg-[#163853] text-gray-500 border-gray-600')}`}
                    >
                      <span className="text-[10px] md:text-sm opacity-80 mb-1">Deep</span>
                      <span className="text-lg md:text-3xl">{globalCalibMax ? 'RESET' : 'SET'}</span>
                    </button>
                  </div>

                  <div className="hidden md:block">
                    {renderStartButton()}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      {step3Complete && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] pt-3 bg-gradient-to-t from-[#0d2b45] via-[#0d2b45]/95 to-transparent shadow-[0_-8px_20px_rgba(0,0,0,0.35)]">
          {renderStartButton('')}
        </div>
      )}
    </div>
  );
}
