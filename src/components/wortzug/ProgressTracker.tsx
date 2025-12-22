"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import { COLORS } from './constants';

interface ProgressTrackerProps {
  word: string;
  currentIndex: number;
  isError: boolean;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ word, currentIndex, isError }) => {
  return (
    <div className="flex flex-col justify-center h-full px-2">
        <div className="text-[9px] text-slate-500 font-mono tracking-wider mb-2 uppercase">Current Assignment</div>
        <div className="flex gap-2">
        {word.split('').map((char, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
            <div key={index} className="relative">
                <motion.div
                    animate={
                        isCompleted ? { scale: [1, 1.1, 1], borderColor: COLORS.ui.text } :
                        isCurrent ? { scale: 1.05, borderColor: isError ? '#ef4444' : COLORS.ui.accent } :
                        { scale: 1, borderColor: '#334155' }
                    }
                    transition={{ duration: 0.3 }}
                    className={clsx(
                        "w-10 h-12 sm:w-12 sm:h-14 rounded-lg border-2 flex items-center justify-center relative overflow-hidden bg-slate-900/50 backdrop-blur-sm transition-colors duration-300",
                        isCompleted ? "bg-emerald-900/20 border-emerald-500 text-emerald-400" :
                        isCurrent ? (isError ? "border-red-500 bg-red-900/10" : "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]") :
                        "border-slate-700 text-slate-600"
                    )}
                >
                    {/* Character */}
                    <span className={clsx(
                        "font-mono font-bold text-xl sm:text-2xl z-10",
                        isCompleted ? "text-emerald-400" : 
                        isCurrent ? (isError ? "text-red-400" : "text-white") : 
                        "text-slate-700"
                    )}>
                        {char}
                    </span>

                    {/* Progress Fill Background for completed */}
                    {isCompleted && (
                        <motion.div 
                            layoutId={`fill-${index}`}
                            initial={{ height: "0%" }}
                            animate={{ height: "100%" }}
                            className="absolute bottom-0 left-0 w-full bg-emerald-500/10"
                        />
                    )}

                    {/* Checkmark overlay for completed */}
                    {isCompleted && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-1 right-1"
                        >
                            <div className="bg-emerald-500 rounded-full p-0.5">
                                <Check size={8} className="text-slate-900" strokeWidth={4} />
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Error Indicator Popup */}
                <AnimatePresence>
                    {isCurrent && isError && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-50"
                        >
                            TRY AGAIN
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            );
        })}
        </div>
    </div>
  );
};