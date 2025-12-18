'use client';

import React, { useEffect, useRef, useState } from 'react';
import { audioController } from './audio';

interface GamePageProps {
    trackingVal: number;
    calibMin: number | null;
    calibMax: number | null;
    mediaStream: MediaStream | null;
    ghostImage: string | null;
    onReset: () => void;
    userName: string;
}

interface Obstacle {
    x: number;
    gapTop: number;
    gapHeight: number;
    width: number;
    passed: boolean;
}

interface Fish {
    x: number;
    y: number;
    speed: number;
    type: string;
}

export default function GamePage({ trackingVal, calibMin, calibMax, mediaStream, ghostImage, onReset, userName }: GamePageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoPreviewRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const latestTrackingVal = useRef(trackingVal);
    const latestCalibMin = useRef(calibMin);
    const latestCalibMax = useRef(calibMax);
    const latestGhostImage = useRef(ghostImage);
    const latestUserName = useRef(userName);

    useEffect(() => { latestTrackingVal.current = trackingVal; }, [trackingVal]);
    useEffect(() => { latestCalibMin.current = calibMin; }, [calibMin]);
    useEffect(() => { latestCalibMax.current = calibMax; }, [calibMax]);
    useEffect(() => { latestGhostImage.current = ghostImage; }, [ghostImage]);
    useEffect(() => { latestUserName.current = userName; }, [userName]);

    useEffect(() => {
        if (videoPreviewRef.current && mediaStream) {
            videoPreviewRef.current.srcObject = mediaStream;
            videoPreviewRef.current.play().catch(e => console.log("Video play error", e));
        }
    }, [mediaStream]);

    useEffect(() => {
        audioController.startAmbience();
        return () => {
            audioController.stopAmbience();
        };
    }, []);

    const [history, setHistory] = useState<number[]>([]);
    useEffect(() => {
        setHistory(prev => {
            const newHist = [...prev, trackingVal];
            if (newHist.length > 100) return newHist.slice(newHist.length - 100);
            return newHist;
        });
    }, [trackingVal]);

    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

    // Game State
    const gameState = useRef({
        diverY: 200,
        diverVelocity: 0,
        obstacles: [] as Obstacle[],
        fishes: [] as Fish[],
        score: 0,
        isGameOver: false,
        frameCount: 0,
        speed: 3,
        prevDiverY: 200,
        nextSpawnFrame: 0
    });

    // --- RESIZE LOGIC ---
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                // Set canvas to full container size
                const { clientWidth, clientHeight } = containerRef.current;
                canvasRef.current.width = clientWidth;
                canvasRef.current.height = clientHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- SOCIAL CARD GENERATOR ---
    const takeSnapshot = React.useCallback((finalScore: number) => {
        if (!videoPreviewRef.current) return;
        const v = videoPreviewRef.current;

        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // 1. Background
            const grad = ctx.createLinearGradient(0, 0, 0, 600);
            grad.addColorStop(0, '#0d2b45');
            grad.addColorStop(1, '#020617');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 800, 600);

            // 2. Polaroid Video
            const vidW = 600;
            const vidH = 450;
            const vidX = 100;
            const vidY = 40;

            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 20;
            ctx.fillRect(vidX - 10, vidY - 10, vidW + 20, vidH + 20);
            ctx.restore();

            try {
                ctx.save();
                ctx.translate(vidX + vidW, vidY);
                ctx.scale(-1, 1);
                ctx.drawImage(v, 0, 0, vidW, vidH);
                ctx.restore();

                const gImg = latestGhostImage.current;
                if (gImg) {
                    const img = new Image();
                    img.src = gImg;
                    ctx.save();
                    ctx.globalAlpha = 0.3;
                    ctx.globalCompositeOperation = 'screen';
                    ctx.translate(vidX + vidW, vidY);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, 0, 0, vidW, vidH);
                    ctx.restore();
                }
            } catch { /* ignore */ }

            // 3. Stamp
            ctx.save();
            ctx.translate(600, 420);
            ctx.rotate(-0.2);
            ctx.fillStyle = '#ff9f1c'; // BRAND ORANGE
            ctx.font = '900 40px sans-serif';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 4;
            const stampText = "MISSION REPORT";
            ctx.strokeText(stampText, 0, 0);
            ctx.fillText(stampText, 0, 0);
            ctx.restore();

            // 4. Footer
            ctx.fillStyle = '#163853';
            ctx.fillRect(0, 500, 800, 100);
            ctx.fillStyle = '#ff9f1c';
            ctx.fillRect(0, 500, 800, 4);

            // STATISTICS
            ctx.fillStyle = '#4cc9f0';
            ctx.font = 'bold 20px monospace';
            ctx.fillText("AGENT:", 40, 540);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 30px sans-serif';

            const uName = latestUserName.current;
            const displayName = uName ? uName.toUpperCase() : "DIBH DIVER";
            ctx.fillText(displayName, 40, 575);

            ctx.fillStyle = '#4cc9f0';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'right';
            ctx.fillText("DEPTH REACHED:", 760, 540);
            ctx.fillStyle = '#ff9f1c';
            ctx.font = '900 40px sans-serif';
            ctx.fillText(`${finalScore}m`, 760, 580);

            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText("CAN YOU BEAT MY SCORE?", 400, 555);

            const url = canvas.toDataURL('image/png');
            setSnapshotUrl(url);
        }
    }, [setSnapshotUrl]); // Stable now that it uses refs for ghostImage/userName

    const handleShare = async () => {
        if (!snapshotUrl) return;
        try {
            const blob = await (await fetch(snapshotUrl)).blob();
            const file = new File([blob], 'dibh-diver-mission.png', { type: 'image/png' });
            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'DIBH DIVER Mission Report',
                    text: `Agent ${userName} held their breath to reach ${score}m in DIBH DIVER! 🤿`,
                    files: [file]
                });
            } else {
                const link = document.createElement('a');
                link.href = snapshotUrl;
                link.download = 'dibh-diver-mission.png';
                link.click();
            }
        } catch { /* ignore */ }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset State
        gameState.current = {
            diverY: canvas.height / 2,
            diverVelocity: 0,
            obstacles: [],
            fishes: [],
            score: 0,
            isGameOver: false,
            frameCount: 0,
            speed: 3,
            prevDiverY: canvas.height / 2,
            nextSpawnFrame: 0
        };
        setGameOver(false);
        setScore(0);
        setSnapshotUrl(null);

        let animationId: number;

        const loop = () => {
            const state = gameState.current;
            const width = canvas.width;
            const height = canvas.height;
            const tVal = latestTrackingVal.current;
            const cMin = latestCalibMin.current;
            const cMax = latestCalibMax.current;

            // 1. INPUT PROCESSING
            let targetY = state.diverY;

            if (cMin !== null && cMax !== null) {
                let norm = 0;
                if (Math.abs(cMax - cMin) > 1) {
                    norm = (tVal - cMin) / (cMax - cMin);
                }
                const clampedNorm = Math.max(0, Math.min(1, norm));
                const padding = height * 0.1; // 10% padding
                const mapY = padding + (1.0 - clampedNorm) * (height - 2 * padding);
                targetY = mapY;
            }

            if (!state.isGameOver) {
                const smoothFactor = 0.08;
                const prevY = state.diverY;
                state.diverY += (targetY - state.diverY) * smoothFactor;

                if (state.diverY < prevY - 1.5) {
                    if (state.frameCount % 5 === 0) {
                        audioController.playBubble();
                    }
                }
            } else {
                // Sink effect
                if (state.diverY < height - 50) {
                    state.diverY += 2;
                }
            }

            // 2. GAME LOGIC
            if (!state.isGameOver) {
                state.frameCount++;

                // Difficulty scales speed
                const difficultyLevel = Math.floor(state.score / 10);

                // Adjust Speed based on width to keep feel consistent
                const baseSpeed = 4 * (width < 600 ? 1.5 : 1);
                state.speed = baseSpeed * Math.pow(1.1, difficultyLevel);

                // Spawn Obstacles
                if (state.frameCount >= state.nextSpawnFrame) {
                    const baseGap = height * 0.3;
                    const minGap = 120;
                    const gapHeight = Math.max(minGap, baseGap * Math.pow(0.95, difficultyLevel));

                    const minGapY = height * 0.1;
                    const maxGapY = height * 0.9 - gapHeight;
                    const gapTop = Math.random() * (maxGapY - minGapY) + minGapY;

                    state.obstacles.push({
                        x: width,
                        gapTop,
                        gapHeight,
                        width: width * 0.1,
                        passed: false
                    });

                    const spawnInterval = Math.max(60, width / state.speed * 0.6);
                    state.nextSpawnFrame = state.frameCount + spawnInterval;
                }

                // Spawn Fish
                if (Math.random() < 0.01) {
                    state.fishes.push({
                        x: width + 50,
                        y: Math.random() * height,
                        speed: Math.random() * 2 + 1,
                        type: Math.random() > 0.5 ? '🐟' : '🐠'
                    });
                }

                // Update Entities
                for (let i = state.fishes.length - 1; i >= 0; i--) {
                    const fish = state.fishes[i];
                    fish.x -= (state.speed * 0.5 + fish.speed);
                    if (fish.x < -50) state.fishes.splice(i, 1);
                }

                for (let i = state.obstacles.length - 1; i >= 0; i--) {
                    const obs = state.obstacles[i];
                    obs.x -= state.speed;

                    if (obs.x + obs.width < 0) {
                        state.obstacles.splice(i, 1);
                        continue;
                    }

                    // Collision Detection
                    const diverRadius = Math.min(20, height * 0.03);
                    const diverXPos = width * 0.2;

                    const diverLeft = diverXPos - diverRadius;
                    const diverRight = diverXPos + diverRadius;
                    const diverTop = state.diverY - diverRadius;
                    const diverBottom = state.diverY + diverRadius;

                    const obsLeft = obs.x;
                    const obsRight = obs.x + obs.width;

                    if (diverRight > obsLeft && diverLeft < obsRight) {
                        if (diverTop < obs.gapTop || diverBottom > obs.gapTop + obs.gapHeight) {
                            state.isGameOver = true;
                            setGameOver(true);
                            audioController.stopAmbience();
                            audioController.playCrash();
                            takeSnapshot(state.score);
                        }
                    }

                    if (!obs.passed && obs.x + obs.width < diverLeft) {
                        obs.passed = true;
                        state.score++;
                        setScore(state.score);
                        audioController.playSonar();
                    }
                }
            }

            // 3. RENDERING
            ctx.clearRect(0, 0, width, height);

            // Background
            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, '#0077b6');
            grad.addColorStop(1, '#023e8a');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // Bubbles Background
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            for (let i = 0; i < 8; i++) {
                const cx = (state.frameCount * 0.5 + i * 150) % width;
                const cy = height - (i * (height / 8));
                ctx.beginPath();
                ctx.arc(cx, cy, i * 3 + 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Fish
            ctx.font = '24px serif';
            state.fishes.forEach(fish => {
                ctx.fillText(fish.type, fish.x, fish.y);
            });

            // Obstacles
            ctx.fillStyle = '#2a9d8f';
            ctx.strokeStyle = '#264653';
            ctx.lineWidth = 4;
            state.obstacles.forEach(obs => {
                ctx.fillRect(obs.x, 0, obs.width, obs.gapTop);
                ctx.strokeRect(obs.x, -4, obs.width, obs.gapTop + 4);
                const bottomY = obs.gapTop + obs.gapHeight;
                ctx.fillRect(obs.x, bottomY, obs.width, height - bottomY);
                ctx.strokeRect(obs.x, bottomY, obs.width, height - bottomY + 4);
                ctx.fillStyle = '#e9c46a';
                if (obs.width > 20) {
                    const decoSize = obs.width * 0.3;
                    ctx.fillRect(obs.x + obs.width / 2 - decoSize / 2, obs.gapTop - decoSize * 2, decoSize, decoSize);
                    ctx.fillRect(obs.x + obs.width / 2 - decoSize / 2, bottomY + decoSize, decoSize, decoSize);
                }
                ctx.fillStyle = '#2a9d8f';
            });

            // Diver
            const diverXPos = width * 0.2;
            const diverRadius = Math.min(20, height * 0.03);
            ctx.save();
            ctx.translate(diverXPos, state.diverY);
            ctx.rotate(0.1);
            const scale = diverRadius / 15;
            ctx.scale(scale, scale);
            ctx.fillStyle = '#f4a261';
            ctx.fillRect(-15, -10, 30, 20);
            ctx.fillStyle = '#264653';
            ctx.fillRect(-15, 0, 30, 15);
            ctx.fillStyle = '#4cc9f0';
            ctx.fillRect(5, -8, 12, 8);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(5, -8, 12, 8);
            ctx.strokeStyle = '#e76f51';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(0, -20);
            ctx.lineTo(-10, -25);
            ctx.stroke();
            ctx.fillStyle = '#e9c46a';
            ctx.beginPath();
            ctx.moveTo(-15, 5);
            ctx.lineTo(-25, 0);
            ctx.lineTo(-25, 10);
            ctx.fill();
            ctx.restore();

            // Score
            ctx.fillStyle = 'white';
            ctx.font = `900 ${Math.min(60, width * 0.15)}px sans-serif`;
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 6;
            ctx.strokeText(state.score.toString(), width / 2, height * 0.15);
            ctx.fillText(state.score.toString(), width / 2, height * 0.15);

            animationId = requestAnimationFrame(loop);
        };

        loop();

        return () => cancelAnimationFrame(animationId);
    }, [takeSnapshot]); // Only restarts if takeSnapshot changes (which it now doesn't) or if mount/unmount

    const handleTryAgain = () => {
        audioController.playClick();
        onReset();
    };

    return (
        <div ref={containerRef} className="w-full h-full relative bg-black flex flex-col items-center justify-center overflow-hidden">

            {/* GAME CANVAS (Full Screen) */}
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover bg-[#0077b6]"
            />

            {/* GAME OVER MODAL (Optimized for Mobile) */}
            {gameOver && (
                <div className="absolute inset-0 bg-black/90 z-50 animate-fade-in backdrop-blur-md flex flex-col items-center justify-center p-4">

                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff9f1c] to-[#ffbf69] uppercase italic drop-shadow-sm leading-none text-center mb-2 md:mb-6">
                        Mission Report
                    </h2>

                    {snapshotUrl && (
                        <div className="relative group perspective-1000 w-full max-w-[320px] md:max-w-[400px] mb-4 md:mb-8">
                            <div className="relative bg-white p-2 transform rotate-1 shadow-2xl">
                                <img
                                    src={snapshotUrl}
                                    className="w-full h-auto object-contain max-h-[35vh] md:max-h-[40vh] border border-gray-200"
                                    alt="Score Snapshot"
                                />
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-10 md:w-8 md:h-12 rounded-full border-4 border-gray-300 bg-gray-100 z-10 shadow-sm"></div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-3 w-full max-w-sm md:max-w-none justify-center items-center">
                        <button
                            onClick={() => { audioController.playClick(); handleShare(); }}
                            className="w-full md:w-auto bg-[#2a9d8f] text-white font-black uppercase px-6 py-3 md:px-8 md:py-4 border-4 border-[#163853] shadow-lg active:scale-95 transition-all text-lg flex items-center justify-center gap-2 group rounded-sm"
                        >
                            <span>Share</span>
                            <span className="group-hover:rotate-12 transition-transform text-xl">📤</span>
                        </button>

                        <button
                            onClick={handleTryAgain}
                            className="w-full md:w-auto bg-[#4cc9f0] text-[#0d2b45] font-black uppercase px-6 py-3 md:px-8 md:py-4 border-4 border-white shadow-[0px_0px_15px_rgba(76,201,240,0.5)] active:scale-95 transition-all text-lg rounded-sm"
                        >
                            New Dive
                        </button>
                    </div>

                    <p className="mt-3 md:mt-4 text-[#8da9c4] text-[10px] md:text-xs uppercase tracking-widest text-center">
                        Beat my high score of {score}m
                    </p>
                </div>
            )}

            {/* --- HUD DASHBOARD (Compact) --- */}
            <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-auto md:w-[600px] h-20 md:h-32 bg-[#0d2b45]/90 border-2 border-[#203c56] shadow-xl p-2 flex gap-2 items-stretch rounded-sm z-10">

                <div className="relative aspect-[4/3] h-full border border-black bg-black overflow-hidden group shrink-0 w-20 md:w-auto">
                    <video
                        ref={videoPreviewRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover scale-x-[-1] opacity-60"
                    />
                    {ghostImage && (
                        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                            <img src={ghostImage} className="w-full h-full object-cover scale-x-[-1]" alt="Ghost constraint" />
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[6px] md:text-[8px] text-white text-center py-0.5 font-mono uppercase tracking-widest">
                        Cam
                    </div>
                </div>

                <div className="flex-1 bg-black/50 border border-white/10 relative flex flex-col min-w-0">
                    <div className="flex justify-between px-2 py-1 bg-[#203c56]/50">
                        <span className="text-[8px] md:text-[10px] text-[#4cc9f0] font-mono uppercase truncate">Breathing-Signal</span>
                    </div>
                    <div className="flex-1 relative w-full overflow-hidden">
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <line x1="0" y1="10" x2="100" y2="10" stroke="#118ab2" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" vectorEffect="non-scaling-stroke" />
                            <line x1="0" y1="90" x2="100" y2="90" stroke="#06d6a0" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" vectorEffect="non-scaling-stroke" />
                            <polyline
                                fill="none"
                                stroke="#4cc9f0"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                                points={history.map((val, i) => {
                                    const len = history.length;
                                    if (len < 2) return `0,50`;
                                    const x = (i / (len - 1)) * 100;
                                    let ratio = 0;
                                    if (calibMin !== null && calibMax !== null) {
                                        const denom = calibMax - calibMin;
                                        if (Math.abs(denom) > 1) {
                                            ratio = (val - calibMin) / denom;
                                        }
                                    } else {
                                        const min = Math.min(...history);
                                        const max = Math.max(...history);
                                        if (max - min > 1) ratio = (val - min) / (max - min);
                                    }
                                    let y = 100 - (ratio * 100);
                                    y = Math.max(0, Math.min(100, y));
                                    return `${x},${y}`;
                                }).join(' ')}
                            />
                        </svg>
                    </div>
                </div>

                <div className="w-6 md:w-12 bg-black/50 border border-white/10 flex flex-col items-center py-1">
                    <div className="w-2 md:w-4 flex-1 bg-gray-900 rounded-full overflow-hidden border border-gray-700 relative">
                        <div
                            className="absolute bottom-0 w-full bg-gradient-to-t from-[#4cc9f0] to-[#48cae4] transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(76,201,240,0.5)]"
                            style={{
                                height: (() => {
                                    if (!calibMin || !calibMax) return '0%';
                                    let ratio = 0;
                                    const denom = calibMax - calibMin;
                                    if (Math.abs(denom) > 1) {
                                        ratio = (trackingVal - calibMin) / denom;
                                    }
                                    const pct = Math.max(0, Math.min(1, ratio)) * 100;
                                    return `${pct}%`;
                                })()
                            }}
                        />
                    </div>
                    <span className="text-[6px] md:text-[8px] text-white mt-1 font-mono">O₂</span>
                </div>
            </div>
        </div>
    );
}