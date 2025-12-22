"use client";
import React from 'react';
import { QWERTZ_LAYOUT } from './constants';
import clsx from 'clsx';

interface VirtualKeyboardProps {
  activeKey: string;
  onKeyPress: (key: string) => void;
  disabled: boolean;
  wrongKey?: string | null;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeKey, onKeyPress, disabled, wrongKey }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center p-2 w-full max-w-6xl mx-auto">
      {QWERTZ_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 sm:gap-2">
          {row.map((key) => {
            const isActive = key === activeKey;
            const isWrong = key === wrongKey;
            
            return (
              <button
                key={key}
                disabled={disabled}
                onClick={() => !disabled && onKeyPress(key)}
                className={clsx(
                  // Reduced sizing: w-8/h-10 on mobile, sm:w-12/sm:h-12 on desktop (previously w-16 h-16)
                  "relative w-8 h-10 sm:w-12 sm:h-12 rounded-lg font-mono font-bold text-lg sm:text-xl transition-all duration-150 select-none flex items-center justify-center shadow-md",
                  // Wrong Key State
                  isWrong 
                    ? "bg-red-500 text-white ring-2 sm:ring-4 ring-red-500/40 animate-shake"
                    : isActive && !disabled
                        // Active State (Target Key)
                        ? "bg-gradient-to-br from-amber-300 to-amber-500 text-slate-900 ring-2 sm:ring-4 ring-amber-500/30 scale-110 -translate-y-1 z-10" 
                        // Default State
                        : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-300 border-b-2 sm:border-b-4 border-slate-900",
                  
                  // Hover State
                  !disabled && !isActive && !isWrong && "hover:bg-slate-600 hover:text-white hover:-translate-y-0.5 hover:shadow-cyan-500/20 hover:border-cyan-500/30",
                  
                  // Disabled State
                  disabled && !isActive && !isWrong && "opacity-30 grayscale cursor-not-allowed border-none bg-slate-800",
                  
                  // Pressed effect (active)
                  "active:scale-95 active:border-b-0 active:translate-y-1"
                )}
              >
                {key}
                {isActive && !isWrong && (
                    <span className="absolute inset-0 rounded-lg ring-2 ring-amber-200 animate-ping opacity-50"></span>
                )}
              </button>
            );
          })}
        </div>
      ))}
      <div className="text-slate-500 text-[10px] sm:text-xs mt-1 font-mono tracking-[0.2em] uppercase flex items-center gap-2 opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
        Waiting for Input: <span className="text-cyan-400 font-bold">{activeKey}</span>
      </div>
      <style>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
        }
        .animate-shake {
            animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};