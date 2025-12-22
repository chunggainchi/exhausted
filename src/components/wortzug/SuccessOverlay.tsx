"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const SuccessOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
        <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-slate-900/90 border-4 border-emerald-400 p-8 rounded-3xl shadow-[0_0_50px_rgba(52,211,153,0.6)] backdrop-blur-xl flex flex-col items-center text-center transform"
        >
            <div className="text-6xl mb-2">🚂💨</div>
            <h2 className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tighter drop-shadow-sm font-mono">
                ABFAHRT!
            </h2>
            <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 my-4 rounded-full"></div>
            <p className="text-slate-300 font-mono text-lg font-bold tracking-widest uppercase">
                Excellent Job!
            </p>
        </motion.div>

        {/* Bursting Stars */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-4xl text-yellow-400"
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ 
                    x: (Math.random() - 0.5) * 400, 
                    y: (Math.random() - 0.5) * 400, 
                    scale: [0, 1.5, 0],
                    rotate: Math.random() * 360
                }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                ★
            </motion.div>
        ))}
    </div>
  );
};