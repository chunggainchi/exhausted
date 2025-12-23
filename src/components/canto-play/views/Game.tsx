"use client";

import React, { useRef, useEffect, useState } from 'react';
import { WORDS } from '../data';
import { Word } from '../types';
import { speak, fxPositive } from '../services/audioService';

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word>(WORDS[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Game State Refs (to avoid re-renders on every frame)
  const gameState = useRef({
    cols: 10,
    rows: 10,
    grid: 40,
    body: [{x: 5, y: 5}],
    dir: {x: 1, y: 0},
    pendingDir: {x: 1, y: 0},
    cheese: {x: 2, y: 2},
    lastMove: 0,
    speed: 5,
    isRunning: true
  });

  const placeCheese = () => {
    const s = gameState.current;
    let valid = false;
    while (!valid) {
      s.cheese = {
        x: Math.floor(Math.random() * s.cols),
        y: Math.floor(Math.random() * s.rows)
      };
      valid = !s.body.some(part => part.x === s.cheese.x && part.y === s.cheese.y);
    }
  };

  const nextWord = () => {
    const w = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(w);
    speak(w.yue, 'yue');
  };

  const handleInput = (key: string) => {
    const s = gameState.current;
    if (key === 'ArrowUp' && s.dir.y !== 1) s.pendingDir = { x: 0, y: -1 };
    if (key === 'ArrowDown' && s.dir.y !== -1) s.pendingDir = { x: 0, y: 1 };
    if (key === 'ArrowLeft' && s.dir.x !== 1) s.pendingDir = { x: -1, y: 0 };
    if (key === 'ArrowRight' && s.dir.x !== -1) s.pendingDir = { x: 1, y: 0 };
  };

  useEffect(() => {
    nextWord();
    
    const handleKeyDown = (e: KeyboardEvent) => handleInput(e.key);
    window.addEventListener('keydown', handleKeyDown);

    let animationFrameId: number;
    
    const loop = (ts: number) => {
      const cvs = canvasRef.current;
      const ctx = cvs?.getContext('2d');
      const s = gameState.current;

      if (cvs && ctx && s.isRunning) {
        // Logic
        if (ts - s.lastMove > (1000 / s.speed)) {
          s.lastMove = ts;
          s.dir = s.pendingDir;
          const head = { x: s.body[0].x + s.dir.x, y: s.body[0].y + s.dir.y };
          
          // Wrap around
          head.x = (head.x + s.cols) % s.cols;
          head.y = (head.y + s.rows) % s.rows;

          // Self Collision
          if (s.body.some((p, i) => i > 0 && p.x === head.x && p.y === head.y)) {
             // Reset
             s.body = [{x: Math.floor(s.cols/2), y: Math.floor(s.rows/2)}];
             setScore(0);
          } else {
             s.body.unshift(head);
             if (head.x === s.cheese.x && head.y === s.cheese.y) {
               setScore(sc => sc + 1);
               fxPositive();
               placeCheese();
               nextWord();
             } else {
               s.body.pop();
             }
          }
        }

        // Draw
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        
        // Grid lines (faint)
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= s.cols; x++) {
           ctx.beginPath(); ctx.moveTo(x * s.grid, 0); ctx.lineTo(x * s.grid, cvs.height); ctx.stroke();
        }
        for (let y = 0; y <= s.rows; y++) {
           ctx.beginPath(); ctx.moveTo(0, y * s.grid); ctx.lineTo(cvs.width, y * s.grid); ctx.stroke();
        }

        // Cheese
        ctx.font = `${s.grid * 0.8}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧀', (s.cheese.x + 0.5) * s.grid, (s.cheese.y + 0.5) * s.grid + 2);

        // Snake
        s.body.forEach((p, i) => {
           if (i === 0) {
             ctx.fillText('🐭', (p.x + 0.5) * s.grid, (p.y + 0.5) * s.grid + 2);
           } else {
             ctx.fillStyle = 'rgba(255,255,255,0.5)';
             const pad = 4;
             ctx.beginPath();
             ctx.roundRect(p.x * s.grid + pad, p.y * s.grid + pad, s.grid - pad*2, s.grid - pad*2, 8);
             ctx.fill();
           }
        });
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    
    animationFrameId = requestAnimationFrame(loop);

    // Resize Handler
    const resize = () => {
      if (containerRef.current && canvasRef.current) {
         const { width, height } = containerRef.current.getBoundingClientRect();
         const grid = 40;
         const cols = Math.floor(width / grid);
         const rows = Math.floor(height / grid);
         
         canvasRef.current.width = cols * grid;
         canvasRef.current.height = rows * grid;
         
         gameState.current.cols = cols;
         gameState.current.rows = rows;
         gameState.current.grid = grid;
      }
    };
    window.addEventListener('resize', resize);
    resize();
    placeCheese();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col h-[85vh] animate-fade-in">
      {/* HUD */}
      <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-lg">
         <div className="flex items-center gap-4">
            <span className="text-3xl">🐭</span>
            <div>
               <p className="text-slate-400 text-sm uppercase font-bold">Der nächste Käse sagt:</p>
               <h2 className="text-2xl font-bold text-white cursor-pointer" onClick={() => speak(currentWord.yue, 'yue')}>{currentWord.yue} <span className="text-slate-500 text-lg">({currentWord.de})</span></h2>
            </div>
         </div>
         <div className="text-right">
            <p className="text-slate-400 text-sm font-bold uppercase">Punkte</p>
            <p className="text-3xl font-mono text-cyan-400">{score}</p>
         </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 bg-slate-900/50 rounded-2xl border border-white/5 relative overflow-hidden shadow-inner" ref={containerRef}>
         <canvas ref={canvasRef} className="mx-auto my-auto block absolute inset-0 m-auto" />
      </div>

      {/* Touch Controls */}
      <div className="md:hidden mt-4 h-48 grid grid-cols-3 grid-rows-2 gap-2">
         <div />
         <button className="bg-slate-700/50 rounded-xl active:bg-cyan-600/50 text-3xl" onPointerDown={() => handleInput('ArrowUp')}>⬆️</button>
         <div />
         <button className="bg-slate-700/50 rounded-xl active:bg-cyan-600/50 text-3xl" onPointerDown={() => handleInput('ArrowLeft')}>⬅️</button>
         <button className="bg-slate-700/50 rounded-xl active:bg-cyan-600/50 text-3xl" onPointerDown={() => handleInput('ArrowDown')}>⬇️</button>
         <button className="bg-slate-700/50 rounded-xl active:bg-cyan-600/50 text-3xl" onPointerDown={() => handleInput('ArrowRight')}>➡️</button>
      </div>
    </div>
  );
};