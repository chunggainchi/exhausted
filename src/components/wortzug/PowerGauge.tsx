"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface PowerGaugeProps {
  progress: number; // 0 to 1
  isComplete: boolean;
}

export const PowerGauge: React.FC<PowerGaugeProps> = ({ progress, isComplete }) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-3 shadow-lg ring-1 ring-white/5 flex flex-col items-center min-w-[100px]">
        <div className="flex items-center gap-1 text-xs text-slate-400 font-mono tracking-wider mb-2 w-full justify-between">
            <span>POWER</span>
            <Zap size={12} className={isComplete ? "text-amber-400 fill-amber-400 animate-pulse" : "text-slate-600"} />
        </div>
        
        <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            {/* Grid lines inside gauge */}
            <div className="absolute inset-0 flex justify-between px-2 opacity-20 z-10">
                <div className="w-0.5 h-full bg-slate-900"></div>
                <div className="w-0.5 h-full bg-slate-900"></div>
                <div className="w-0.5 h-full bg-slate-900"></div>
            </div>

            {/* Fill Bar */}
            <motion.div 
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative"
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
            >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
            </motion.div>
        </div>
        
        <div className="w-full flex justify-end mt-1">
             <span className="text-[10px] font-mono text-cyan-400 font-bold">
                 {Math.round(progress * 100)}%
             </span>
        </div>
    </div>
  );
};