"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface CargoGaugeProps {
  progress: number; // 0 to 1
}

export const CargoGauge: React.FC<CargoGaugeProps> = ({ progress }) => {
  return (
    <div className="flex flex-col justify-center w-[120px]">
        <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono tracking-widest mb-1.5">
            <span>CARGO</span>
            <span className={`font-bold ${progress >= 1 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                 {Math.round(progress * 100)}%
             </span>
        </div>
        
        <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
            <motion.div 
                className="h-full relative"
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
            >
                <div className={`w-full h-full ${progress >= 1 ? 'bg-emerald-500' : 'bg-cyan-500'}`}>
                    <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 skew-x-[-20deg]"
                    />
                </div>
            </motion.div>
        </div>
    </div>
  );
};