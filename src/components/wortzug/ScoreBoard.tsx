"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  const [prevScore, setPrevScore] = useState(score);

  useEffect(() => {
    if (score > prevScore) {
      setPrevScore(score);
    }
  }, [score, prevScore]);

  return (
    <div className="flex flex-col items-center justify-center min-w-[60px]">
        <div className="text-[9px] text-slate-500 font-mono tracking-widest mb-1 uppercase">
            Trains
        </div>
        
        <div className="flex items-center gap-2">
            <div className="relative">
                <Trophy size={18} className="text-amber-400" />
                <AnimatePresence>
                    {score > 0 && (
                        <motion.div
                           key={score}
                           initial={{ scale: 0, opacity: 0 }}
                           animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0], rotate: 180 }}
                           className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-200 rounded-full blur-[2px]"
                        />
                    )}
                </AnimatePresence>
            </div>
            
            <div className="relative">
                 <motion.div
                    key={score}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl font-mono font-bold text-white"
                 >
                     {score}
                 </motion.div>
            </div>
        </div>
    </div>
  );
};