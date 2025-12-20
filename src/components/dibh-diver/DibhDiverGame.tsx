'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import BreathingTracker from './BreathingTracker';
import GamePage from '@/components/dibh-diver/GamePage';
import Onboarding from '@/components/dibh-diver/Onboarding';
import { audioController } from './audio';
import './game.css';

// Global State Interface
export interface GlobalState {
  calibMin: number | null; // Normal/Relaxed
  calibMax: number | null; // Deep Breath
  trackingVal: number;
  isTracking: boolean;
}

export default function DibhDiverGame() {
  const [currentPage, setCurrentPage] = useState<'intro' | 'onboarding' | 'config' | 'game'>('intro');

  // User Identity
  const [userName, setUserName] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<'child' | 'adult'>('adult');

  // Lifted State for Tracking
  const [globalTrackingVal, setGlobalTrackingVal] = useState(0);
  const [calibMin, setCalibMin] = useState<number | null>(null);
  const [calibMax, setCalibMax] = useState<number | null>(null);
  const [isCVReady, setIsCVReady] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  // Store stream to pass to GamePage for thumbnail
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [ghostImage, setGhostImage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Load User Name on Mount
  useEffect(() => {
    const storedName = localStorage.getItem('dibh_agent_name');
    if (storedName) {
      setUserName(storedName);
    }
    const storedAge = localStorage.getItem('dibh_agent_age');
    if (storedAge === 'child' || storedAge === 'adult') {
      setAgeGroup(storedAge);
    }
  }, []);

  // Fullscreen effect
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!mainContainerRef.current) return;
    if (!document.fullscreenElement) {
      mainContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err instanceof Error ? err.message : String(err)}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleTrackingUpdate = (val: number) => {
    setGlobalTrackingVal(val);
  };

  const handleFullReset = () => {
    setGhostImage(null);
    setCalibMin(null);
    setCalibMax(null);
    setCurrentPage('config');
  };

  const handleStartApp = () => {
    audioController.playClick();
    if (userName) {
      // If we already know who they are, skip onboarding
      setCurrentPage('config');
    } else {
      setCurrentPage('onboarding');
    }
  }

  const handleNameSubmit = (name: string, age: 'child' | 'adult') => {
    setUserName(name);
    setAgeGroup(age);
    localStorage.setItem('dibh_agent_name', name);
    localStorage.setItem('dibh_agent_age', age);
    setCurrentPage('config');
  };

  const handleExit = () => {
    audioController.playClick();
    handleFullReset();
    setCurrentPage('intro');
  }

  const handleSwitchUser = () => {
    audioController.playClick();
    // Reset calibration state
    setGhostImage(null);
    setCalibMin(null);
    setCalibMax(null);
    setCurrentPage('onboarding');
  };

  // Generate random bubbles for intro on the client to avoid SSR hydration mismatch
  const [bubbles, setBubbles] = useState<Array<{
    left: string;
    width: string;
    height: string;
    animationDuration: string;
    animationDelay: string;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 40 + 10}px`,
      height: `${Math.random() * 40 + 10}px`,
      animationDuration: `${Math.random() * 10 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setBubbles(generated);
  }, []);

  return (
    <div ref={mainContainerRef} className="min-h-screen bg-[#0d2b45] text-[#ffecd1] font-sans selection:bg-[#ff9f1c] selection:text-[#0d2b45] overflow-hidden relative">

      {/* HEADER / NAVBAR */}
      <nav className="border-b-4 border-[#203c56] bg-[#0d2b45] h-14 md:h-16 flex items-center px-4 md:px-6 justify-between shadow-xl relative z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => currentPage !== 'intro' && handleExit()}>
          {/* LOGO: Breathing Animation + Orange/Blue Theme */}
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform animate-[bounce_3s_infinite]">
              <Image
                src="/images/games/dibh-diver/dibh logo.png"
                alt="DIBH Diver Logo"
                fill
                sizes="(max-width: 768px) 40px, 48px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white drop-shadow-md leading-none">
              DIBH<span className="text-[#4cc9f0]"> DIVER</span>
            </h1>
            <span className="text-[10px] text-[#8da9c4] font-mono tracking-widest uppercase hidden sm:block">Breath Controller</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userName && currentPage !== 'intro' && currentPage !== 'onboarding' && (
            <button
              onClick={handleSwitchUser}
              className="flex flex-col items-end hover:bg-white/5 px-2 py-1 rounded transition-colors group/agent"
              title="Switch Agent"
            >
              <span className="text-[8px] text-[#8da9c4] uppercase tracking-widest group-hover/agent:text-[#4cc9f0]">Switch Agent</span>
              <span className="text-xs font-bold text-[#4cc9f0] uppercase flex items-center gap-1">
                {userName} {!isCVReady && currentPage === 'config' ? '(Initializing...)' : ''}
                <span className="text-[10px] opacity-0 group-hover/agent:opacity-100 transition-opacity">✎</span>
              </span>
            </button>
          )}
          {currentPage !== 'intro' && currentPage !== 'onboarding' && (
            <button
              onClick={toggleFullscreen}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded bg-[#163853] border-2 border-[#203c56] text-white hover:bg-[#203c56] transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <span className="text-lg">{isFullscreen ? '✕' : '⛶'}</span>
            </button>
          )}
          {isTracking && currentPage === 'game' && <div className="w-2 h-2 bg-[#ff9f1c] rounded-full animate-pulse shadow-[0_0_8px_#ff9f1c]"></div>}
        </div>
      </nav>

      {/* PAGE ROUTER */}
      <div className="w-full h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] relative">

        {/* INTRO SCREEN */}
        {currentPage === 'intro' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0d2b45] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#163853] to-[#0d2b45] overflow-hidden p-4">

            {/* Dynamic Background */}
            {bubbles.map((style, i) => (
              <div key={i} className="bubble" style={style} />
            ))}
            <div className="fishBg text-6xl" style={{ top: '20%', animationDuration: '25s' }}>🐟</div>
            <div className="fishBg text-4xl" style={{ top: '60%', animationDuration: '35s', animationDelay: '2s' }}>🐠</div>
            <div className="fishBg text-5xl" style={{ top: '80%', animationDuration: '20s', animationDelay: '5s' }}>🐡</div>

            <div className="text-center animate-fade-in-up z-10 w-full max-w-4xl flex flex-col items-center">

              {/* BREATHING LOGO ANIMATION */}
              <div className="mb-6 md:mb-8 relative flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative z-10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]">
                  <Image
                    src="/images/games/dibh-diver/dibh logo.png"
                    alt="DIBH Diver Logo"
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#4cc9f0] to-[#0077b6] drop-shadow-[0_0_15px_rgba(76,201,240,0.4)] md:drop-shadow-[0_0_30px_rgba(76,201,240,0.6)] uppercase tracking-tighter italic transform -rotate-2 mb-4 leading-none py-2 pr-4">
                DIBH<br />DIVER
              </h1>
              <p className="text-[#8da9c4] text-sm sm:text-lg md:text-2xl font-mono mb-8 md:mb-12 tracking-widest uppercase px-4">
                The Breath-Controlled Underwater Adventure
              </p>

              <button
                onClick={handleStartApp}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 md:px-12 md:py-6 text-xl md:text-2xl font-black text-[#0d2b45] uppercase tracking-widest bg-[#ff9f1c] border-4 border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffbf69] hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <span className="relative z-10">{userName ? 'Resume Mission' : 'Start Mission'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ONBOARDING LAYER */}
        {currentPage === 'onboarding' && (
          <div className="absolute inset-0 z-20 bg-[#0d2b45]">
            <Onboarding
              onComplete={handleNameSubmit}
              initialName={userName}
              initialAgeGroup={ageGroup}
            />
          </div>
        )}

        {/* 
           TRACKER LAYER (CONFIG)
        */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${(currentPage === 'game' || currentPage === 'intro' || currentPage === 'onboarding') ? 'opacity-0 pointer-events-none z-0' : 'opacity-100 z-10'}`}
          aria-hidden={currentPage !== 'config'}
        >
          {currentPage !== 'intro' && currentPage !== 'onboarding' && (
            <BreathingTracker
              onTrackingUpdate={handleTrackingUpdate}
              setGlobalIsCVReady={setIsCVReady}
              setGlobalIsTracking={setIsTracking}
              globalCalibMin={calibMin}
              globalCalibMax={calibMax}
              setGlobalCalibMin={setCalibMin}
              setGlobalCalibMax={setCalibMax}
              onStartGame={() => setCurrentPage('game')}
              onStreamReady={setMediaStream}
              onGhostCapture={setGhostImage}
              ghostImage={ghostImage}
            />
          )}
        </div>

        {/* GAME LAYER */}
        {currentPage === 'game' && (
          <div className="absolute inset-0 z-20">
            <GamePage
              trackingVal={globalTrackingVal}
              calibMin={calibMin}
              calibMax={calibMax}
              mediaStream={mediaStream}
              ghostImage={ghostImage}
              onReset={handleFullReset}
              userName={userName}
              ageGroup={ageGroup}
            />
          </div>
        )}

      </div>

      {/* Desktop Footer Link */}
      <a
        href="https://exhaustedrocket.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-1 right-2 text-[10px] text-white/20 hover:text-[#4cc9f0]/60 z-[60] pointer-events-auto transition-colors font-mono uppercase tracking-widest hidden md:block"
      >
        Product of exhaustedrocket.com
      </a>
    </div>
  );
}
