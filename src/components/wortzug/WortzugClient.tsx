"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Home, Settings, Minimize, Maximize, RotateCcw, Play, Sparkles } from "lucide-react";

import { 
    HOME_POS, 
    PRINTER_POS, 
    VIEW_HEIGHT, 
    VIEW_WIDTH, 
    WAGON_SPACING, 
    WAGON_START_X,
    WAGON_Y_OFFSET,
    FLOOR_Y,
    COLORS
} from './constants';
import { GameState, Point } from './types';
import { RoboticArm } from "./RoboticArm";
import { Train } from "./Train";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { ProgressTracker } from "./ProgressTracker";
import { CargoGauge } from "./CargoGauge";
import { ScoreBoard } from "./ScoreBoard";
import { SuccessOverlay } from "./SuccessOverlay";
import { Confetti } from "./Confetti";
import { ParentSettingsModal } from "./ParentSettingsModal";

import { audioService } from "./services/audioService";
import { useWordList } from "./hooks/useWordList";
import { useMediaQuery } from "./hooks/useMediaQuery";

const App: React.FC = () => {
  // Device Detection
  const isTouchDevice = useMediaQuery('(max-width: 1024px), (max-height: 700px)');
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [mobileInputValue, setMobileInputValue] = useState('');

  // Parent Settings Logic
  const { words: parentWordList, loaded: wordListLoaded, addWord, removeWord, resetToDefault } = useWordList();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Game State
  const [hasStarted, setHasStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [loadedLetters, setLoadedLetters] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Feedback State
  const [wrongKey, setWrongKey] = useState<string | null>(null);

  // Arm State
  const [armTarget, setArmTarget] = useState<Point>(HOME_POS);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [heldLetter, setHeldLetter] = useState<string | undefined>(undefined);

  // Derive Current Word Safely
  const currentWord = useMemo(() => {
    if (parentWordList.length === 0) return "AUTO"; 
    const safeIndex = Math.abs(wordIndex) % parentWordList.length;
    return parentWordList[safeIndex];
  }, [parentWordList, wordIndex]);

  const currentTargetLetter = currentWord[letterIndex] ?? "";

  // Initialize Word
  useEffect(() => {
    if (gameState === GameState.IDLE && hasStarted) {
      setLoadedLetters(new Array(currentWord.length).fill(null));
      setGameState(GameState.WAITING_FOR_INPUT);
      audioService.speak(`Baue das Wort: ${currentWord}`);
    }
  }, [gameState, currentWord, hasStarted]);

  // Handle Settings change mid-game
  useEffect(() => {
      if (hasStarted && loadedLetters.length !== currentWord.length) {
          setLoadedLetters(new Array(currentWord.length).fill(null));
          setLetterIndex(0);
      }
  }, [currentWord, hasStarted, loadedLetters.length]);

  // Audio effect for arm movement
  useEffect(() => {
    const isMoving = [
        GameState.MOVING_TO_PRINTER, 
        GameState.MOVING_TO_WAGON, 
        GameState.RETURNING
    ].includes(gameState);
    
    audioService.playServo(isMoving);
  }, [gameState]);

  // Animation Orchestrator
  const runAnimationSequence = useCallback(async (letter: string) => {
    setGameState(GameState.MOVING_TO_PRINTER);
    setArmTarget({ x: PRINTER_POS.x, y: PRINTER_POS.y - 100 }); 
    await new Promise(r => setTimeout(r, 600));

    setArmTarget(PRINTER_POS);
    await new Promise(r => setTimeout(r, 400));

    setGameState(GameState.GRABBING);
    setIsGrabbing(true);
    audioService.playPneumaticHiss();
    await new Promise(r => setTimeout(r, 250)); 
    setHeldLetter(letter);
    
    setArmTarget({ x: PRINTER_POS.x, y: PRINTER_POS.y - 30 });
    await new Promise(r => setTimeout(r, 150));

    setArmTarget({ x: PRINTER_POS.x, y: PRINTER_POS.y - 140 });
    await new Promise(r => setTimeout(r, 500));
    
    setGameState(GameState.MOVING_TO_WAGON);
    const wagonTargetX = WAGON_START_X + (letterIndex * WAGON_SPACING) + 35; 
    const wagonTargetY = WAGON_Y_OFFSET - 20; 
    
    setArmTarget({ x: wagonTargetX, y: wagonTargetY - 100 });
    await new Promise(r => setTimeout(r, 700));

    setArmTarget({ x: wagonTargetX, y: wagonTargetY });
    await new Promise(r => setTimeout(r, 400));

    setGameState(GameState.DROPPING);
    setIsGrabbing(false);
    setHeldLetter(undefined);
    audioService.playClunk();
    
    // Update Logic
    const nextLoadedLetters = [...loadedLetters];
    nextLoadedLetters[letterIndex] = letter;
    setLoadedLetters(nextLoadedLetters);

    // Audio Feedback
    const lettersSoFar = currentWord.slice(0, letterIndex + 1).split('');
    const partialWord = currentWord.slice(0, letterIndex + 1);
    audioService.speakSpelling(lettersSoFar, partialWord);

    await new Promise(r => setTimeout(r, 300));

    setArmTarget({ x: wagonTargetX, y: wagonTargetY - 80 });
    await new Promise(r => setTimeout(r, 400));

    setGameState(GameState.RETURNING);
    setArmTarget(HOME_POS);
    await new Promise(r => setTimeout(r, 600));

    if (letterIndex === currentWord.length - 1) {
        setGameState(GameState.COMPLETED_WORD);
        setScore(s => s + 1); 
        await new Promise(r => setTimeout(r, 1500));
        audioService.speak(`Super! ${currentWord}`);
        
        await new Promise(r => setTimeout(r, 2000));
        setWordIndex(prev => prev + 1);
        setLetterIndex(0);
        setGameState(GameState.IDLE); 
    } else {
        setLetterIndex(prev => prev + 1);
        setGameState(GameState.WAITING_FOR_INPUT);
    }

  }, [letterIndex, currentWord, loadedLetters]);

  // Input Handler
  const handleInput = useCallback((key: string) => {
    if (gameState !== GameState.WAITING_FOR_INPUT) return;
    
    const target = currentTargetLetter;
    if (!target) return;
    if (key.toUpperCase() === target) {
        setWrongKey(null);
        runAnimationSequence(target);
    } else {
        setWrongKey(key.toUpperCase());
        setTimeout(() => setWrongKey(null), 600);
    }
  }, [gameState, currentTargetLetter, runAnimationSequence]);

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const char = val.slice(-1);
    handleInput(char);
    setMobileInputValue('');
  };

  const focusMobileInput = () => {
    if (isTouchDevice && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isTouchDevice || isSettingsOpen || !hasStarted) return; 
    const listener = (e: KeyboardEvent) => {
        handleInput(e.key.toUpperCase());
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handleInput, isTouchDevice, isSettingsOpen, hasStarted]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(e => console.error(e));
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    }
  };

  const startGame = () => {
    if (!wordListLoaded) return;
    setHasStarted(true);
    setGameState(GameState.IDLE);
    setScore(0);
    audioService.playPneumaticHiss();
    if (isTouchDevice) {
        setTimeout(focusMobileInput, 100);
    }
  };

  const goHome = () => {
      setHasStarted(false);
      setGameState(GameState.IDLE);
      // Optional: don't reset score if you want persistence, but for "Back to Start" reset feels right
      // setScore(0); 
  };

  const resetWord = () => {
      setWordIndex(prev => prev + 1);
      setLetterIndex(0);
      setGameState(GameState.IDLE);
  };

  const showPrinterBlock = 
      gameState === GameState.WAITING_FOR_INPUT || 
      gameState === GameState.MOVING_TO_PRINTER || 
      (gameState === GameState.GRABBING && !heldLetter);

  const cargoProgress = letterIndex / (currentWord.length || 1);
  
  const floatingLetters = useMemo(() => {
  // Generate deterministic-ish random values ONCE per mount (client)
  return Array.from({ length: 5 }).map(() => {
    const x = `${Math.random() * 80}vw`;
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const duration = 15 + Math.random() * 10;
    return { x, letter, duration };
  });
}, []);


  return (
    <div 
        className="h-screen w-screen flex flex-col relative overflow-hidden font-sans" 
        style={{ backgroundColor: COLORS.background }}
        onClick={focusMobileInput}
    >
      {/* Mobile Input Trap */}
      {isTouchDevice && (
        <input 
            ref={mobileInputRef}
            type="text" 
            className="absolute top-0 left-0 w-px h-px opacity-0 pointer-events-none"
            autoComplete="off"
            autoCorrect="off" 
            autoCapitalize="characters"
            inputMode="text"
            value={mobileInputValue}
            onChange={handleMobileInputChange}
            aria-hidden="true"
        />
      )}

      {/* --- HUD LAYER (Only visible when game started) --- */}
      {hasStarted && (
        <div className="absolute top-0 left-0 w-full p-2 sm:p-4 z-20 pointer-events-none flex flex-wrap items-start justify-between gap-2 sm:gap-4 animate-in fade-in duration-700">
            
            {/* 1. Header Logo / Home Button */}
            <button 
                onClick={goHome} 
                className="order-1 pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-2 sm:p-3 shadow-lg hover:bg-slate-800 transition-colors flex items-center gap-2 group ring-1 ring-white/5"
            >
                <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-900 p-1.5 rounded-md sm:rounded-lg">
                    <Home size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-mono font-bold text-slate-200 text-sm hidden lg:block pr-1 group-hover:text-white transition-colors">START</span>
            </button>

            {/* 2. Dashboard Controls (Top Right) */}
            <div className="order-2 sm:order-3 pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-2 sm:p-3 shadow-lg flex items-center gap-3 sm:gap-4 ring-1 ring-white/5">
                <ScoreBoard score={score} />
                
                <div className="hidden sm:block">
                     <CargoGauge progress={cargoProgress} />
                </div>
                
                <div className="h-6 w-px bg-slate-700/50 mx-1"></div>
                
                <div className="flex gap-1">
                     <button 
                        onClick={(e) => { e.stopPropagation(); setIsSettingsOpen(true); }}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                     >
                        <Settings size={18} />
                     </button>
                     <button 
                        onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors hidden sm:block"
                     >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                     </button>
                     <button 
                        onClick={(e) => { e.stopPropagation(); resetWord(); }}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                     >
                        <RotateCcw size={18} />
                     </button>
                </div>
            </div>

            {/* 3. Progress Tracker (Full width on mobile, Center on Desktop) */}
            <div className="order-3 sm:order-2 w-full sm:w-auto flex justify-center pointer-events-auto">
                 <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-2 shadow-lg w-full sm:w-auto flex justify-center ring-1 ring-white/5">
                    <ProgressTracker 
                        word={currentWord} 
                        currentIndex={letterIndex} 
                        isError={!!wrongKey} 
                    />
                 </div>
            </div>
        </div>
      )}

      {/* --- START MENU OVERLAY (Visible when !hasStarted) --- */}
      {!hasStarted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
             {/* Backdrop Blur to make text readable but keep game visible */}
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all duration-1000" />
             
             {/* Floating Background Elements */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
  {floatingLetters.map((item, i) => (
    <motion.div
      key={i}
      initial={{ y: "110vh", x: item.x, rotate: 0 }}
      animate={{ y: "-10vh", rotate: 360 }}
      transition={{
        duration: item.duration,
        repeat: Infinity,
        ease: "linear",
        delay: i * 2,
      }}
      className="absolute text-slate-700/30 font-black text-8xl font-mono"
    >
      {item.letter}
    </motion.div>
  ))}
</div>


             {/* Menu Card */}
             <div className="bg-slate-900/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-lg border border-slate-700/50 relative z-10 ring-1 ring-white/10 overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col items-center"
                >
                    <div className="flex justify-center mb-4">
                        <span className="text-6xl sm:text-7xl">🚂</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-emerald-400 mb-2 font-mono tracking-widest drop-shadow-sm">
                        WORT-ZUG
                    </h1>
                    <p className="text-slate-400 text-lg sm:text-xl mb-8 font-mono tracking-wide">
                        ROBOTIC WORD BUILDER
                    </p>
                    
                    <div className="flex flex-col gap-4 justify-center items-center w-full">
                        <button 
                            onClick={startGame}
                            disabled={!wordListLoaded}
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-slate-900 transition-all duration-200 bg-gradient-to-r from-cyan-400 to-cyan-300 font-mono rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Play className="w-6 h-6 mr-3 fill-current" />
                            START ENGINE
                            <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white opacity-50 animate-pulse" />
                        </button>
                        
                        <button 
                            onClick={() => setIsSettingsOpen(true)}
                            className="text-slate-500 hover:text-cyan-400 text-sm font-bold flex items-center gap-2 transition-colors py-2"
                        >
                            <Settings size={14} />
                            Parent Settings
                        </button>
                    </div>

                    {/* Branding Footer Link */}
                    <div className="mt-8 text-[10px] sm:text-xs text-slate-500 font-mono tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
                        <a 
                            href="https://exhaustedrocket.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-cyan-400 border-b border-transparent hover:border-cyan-400 pb-0.5 transition-all"
                        >
                            PRODUCT OF EXHAUSTEDROCKET.COM
                        </a>
                    </div>
                </motion.div>
             </div>
        </div>
      )}

      {/* --- MAIN SCENE LAYER (Always rendered at bottom) --- */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center relative p-2 sm:p-4 pt-28 sm:pt-32 pb-0">
          <svg 
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} 
            className="w-full h-full rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl relative z-0"
            preserveAspectRatio="xMidYMid meet"
          >
              <defs>
                  <radialGradient id="sceneGlow" cx="0.5" cy="0.5" r="0.7">
                      <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
                  </radialGradient>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.grid} strokeWidth="1" opacity="0.5"/>
                  </pattern>
                  <linearGradient id="pipeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="20%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#64748b" />
                    <stop offset="80%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
              </defs>
              
              {/* Background */}
              <rect width="100%" height="100%" fill="url(#sceneGlow)" />
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Floor */}
              <line x1="0" y1={FLOOR_Y} x2={VIEW_WIDTH} y2={FLOOR_Y} stroke={COLORS.floor} strokeWidth="4" />
              <path d={`M 0 ${FLOOR_Y+2} L ${VIEW_WIDTH} ${FLOOR_Y+2} L ${VIEW_WIDTH} ${VIEW_HEIGHT} L 0 ${VIEW_HEIGHT} Z`} fill={COLORS.floor} opacity="0.3" />

              {/* Factory Infrastructure */}
              <g transform={`translate(${PRINTER_POS.x}, 0)`}>
                 <rect x="-25" y="0" width="50" height={PRINTER_POS.y - 40} fill="url(#pipeGradient)" stroke="#1e293b" strokeWidth="2" />
                 <rect x="-30" y="50" width="60" height="12" fill="#334155" stroke="#1e293b" rx={2} />
                 <rect x="-30" y="150" width="60" height="12" fill="#334155" stroke="#1e293b" rx={2} />
                 <rect x="-30" y="250" width="60" height="12" fill="#334155" stroke="#1e293b" rx={2} />
                 <path d={`M -25 ${PRINTER_POS.y - 40} L -35 ${PRINTER_POS.y - 10} L 35 ${PRINTER_POS.y - 10} L 25 ${PRINTER_POS.y - 40} Z`} fill="#334155" stroke="#1e293b" />
              </g>

              {/* Signal Tower */}
              <g transform={`translate(1100, ${FLOOR_Y})`}>
                  <rect x="-5" y="-200" width="10" height="200" fill="#334155" stroke="#1e293b" />
                  <rect x="-15" y="0" width="30" height="5" fill="#1e293b" />
                  <g transform="translate(0, -180)">
                      <rect x="-20" y="0" width="40" height="80" rx={4} fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <circle cx="0" cy="25" r="10" 
                        fill={gameState !== GameState.COMPLETED_WORD ? "#ef4444" : "#450a0a"} 
                        className={gameState !== GameState.COMPLETED_WORD ? "animate-pulse" : ""}
                        filter={gameState !== GameState.COMPLETED_WORD ? "drop-shadow(0 0 8px #ef4444)" : ""}
                      />
                      <circle cx="0" cy="55" r="10" 
                        fill={gameState === GameState.COMPLETED_WORD ? "#22c55e" : "#052e16"} 
                        filter={gameState === GameState.COMPLETED_WORD ? "drop-shadow(0 0 12px #22c55e)" : ""}
                      />
                      <path d="M -16 12 Q 0 5 16 12" stroke="black" fill="none" strokeWidth="2" opacity="0.6" />
                      <path d="M -16 42 Q 0 35 16 42" stroke="black" fill="none" strokeWidth="2" opacity="0.6" />
                  </g>
              </g>

              {/* Printer Machine */}
              <g transform={`translate(${PRINTER_POS.x - 45}, ${PRINTER_POS.y + 20})`}>
                  <path d="M 0 0 L 90 0 L 100 60 L -10 60 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
                  <rect x="5" y="-15" width="80" height="15" fill="#1e293b" stroke="#334155" rx={4} />
                  
                  {/* FUNCTIONAL BLOCK COUNTER / LCD DISPLAY */}
                  <rect x="20" y="20" width="50" height="20" fill="#0f172a" rx={2} stroke="#1e293b"/>
                  <text 
                    x="45" 
                    y="34" 
                    textAnchor="middle" 
                    fill={gameState === GameState.WAITING_FOR_INPUT ? "#34d399" : "#475569"} 
                    fontSize="11" 
                    fontWeight="bold" 
                    className="font-mono tracking-widest"
                  >
                     {letterIndex + 1}/{currentWord.length}
                  </text>
                  
                  {showPrinterBlock && (
                      <g transform="translate(5, -55)">
                         <ellipse cx="40" cy="55" rx="15" ry="4" fill="black" opacity="0.3" />
                         <g className={gameState === GameState.WAITING_FOR_INPUT ? "animate-bounce" : ""}>
                             <rect x="20" y="0" width="40" height="40" rx={8} fill={COLORS.blocks.pending} stroke="white" strokeWidth={3} />
                             <rect x="25" y="5" width="30" height="30" rx={4} fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
                             <text x="40" y="26" textAnchor="middle" dominantBaseline="middle" fill={COLORS.blocks.text} fontWeight="bold" fontSize="24" className="font-mono">
                                 {currentTargetLetter}
                             </text>
                         </g>
                         <rect 
                            x="15" y="-5" width="50" height="50" rx={12} fill="none" 
                            stroke={COLORS.blocks.pending} strokeWidth="4" opacity="0.3" 
                            className={gameState === GameState.WAITING_FOR_INPUT ? "animate-pulse" : "hidden"} 
                         />
                      </g>
                  )}
              </g>

              {/* Train and Arm are ALWAYS visible now, adding life to the start screen */}
              <Train 
                currentWord={currentWord} 
                loadedLetters={loadedLetters} 
                departing={gameState === GameState.COMPLETED_WORD} 
              />
              
              {gameState === GameState.COMPLETED_WORD && (
                  <Confetti x={WAGON_START_X + 200} y={WAGON_Y_OFFSET - 100} />
              )}

              <RoboticArm 
                target={armTarget} 
                isGrabbing={isGrabbing} 
                heldLetter={heldLetter}
              />
          </svg>
          
          {/* In-game footer link */}
          {hasStarted && (
            <div className="absolute bottom-1 right-2 z-10 opacity-30 hover:opacity-100 transition-opacity hidden sm:block">
                <a 
                    href="https://exhaustedrocket.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] text-slate-500 font-mono tracking-widest uppercase hover:text-cyan-400"
                >
                    exhaustedrocket.com
                </a>
            </div>
          )}

          <AnimatePresence>
              {gameState === GameState.COMPLETED_WORD && <SuccessOverlay />}
          </AnimatePresence>
      </div>

      {/* --- KEYBOARD LAYER (Only when started) --- */}
      {!isTouchDevice && hasStarted && (
        <div className="flex-shrink-0 bg-slate-900 border-t border-slate-800 z-20 pb-4 pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <VirtualKeyboard 
                activeKey={gameState === GameState.WAITING_FOR_INPUT ? currentTargetLetter : ''}
                onKeyPress={handleInput}
                disabled={gameState !== GameState.WAITING_FOR_INPUT}
                wrongKey={wrongKey}
            />
        </div>
      )}

      {/* Parent Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
            <ParentSettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)}
                words={parentWordList}
                onAddWord={addWord}
                onRemoveWord={removeWord}
                onResetWords={resetToDefault}
            />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
