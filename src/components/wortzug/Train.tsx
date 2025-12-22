"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { WAGON_SPACING, WAGON_START_X, WAGON_Y_OFFSET, COLORS } from './constants';

interface TrainProps {
  currentWord: string;
  loadedLetters: (string | null)[];
  departing: boolean;
}

export const Train: React.FC<TrainProps> = ({ currentWord, loadedLetters, departing }) => {
  return (
    <motion.g
        animate={{ 
            x: departing ? 1200 : 0, 
            y: departing ? 0 : [0, -1, 0] // Subtle idle breathing
        }}
        transition={{ 
            x: { duration: 3, ease: [0.2, 0, 0.2, 1] },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
        }}
    >
      {/* LOCOMOTIVE ENGINE */}
      <g transform={`translate(${WAGON_START_X + (currentWord.length * WAGON_SPACING) + 35}, ${WAGON_Y_OFFSET - 25})`}>
         
         {/* Cow Catcher (Pilot) */}
         <path d="M 85 60 L 100 60 L 95 45 Z" fill="#334155" stroke="#1e293b" strokeWidth={1} />
         <line x1="88" y1="60" x2="93" y2="48" stroke="#64748b" strokeWidth={1} />
         <line x1="92" y1="60" x2="95" y2="48" stroke="#64748b" strokeWidth={1} />

         {/* Main Boiler/Nose */}
         <rect x="30" y="25" width="60" height="35" fill="#ef4444" stroke="#991b1b" strokeWidth={2} rx={2} />
         
         {/* Cab (Taller part) */}
         <path d="M -5 60 L -5 10 L 30 10 L 30 60 Z" fill="#dc2626" stroke="#991b1b" strokeWidth={2} />
         
         {/* Roof */}
         <path d="M -10 10 L 35 10 L 35 5 L -10 5 Z" fill="#7f1d1d" />

         {/* Window */}
         <rect x="0" y="18" width="20" height="15" fill="#bae6fd" stroke="#7f1d1d" rx={1} />
         <line x1="0" y1="33" x2="20" y2="18" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />

         {/* Smokestack */}
         <path d="M 70 25 L 70 10 L 65 5 L 85 5 L 80 10 L 80 25 Z" fill="#1e293b" />
         
         {/* Stripe */}
         <rect x="-5" y="45" width="95" height="6" fill="#fbbf24" />

         {/* Wheels - Big Drive Wheels */}
         <g>
            <circle cx="10" cy="60" r="16" fill="#1f2937" stroke="#4b5563" strokeWidth="3" />
            <circle cx="10" cy="60" r="6" fill="#9ca3af" />
            <circle cx="55" cy="60" r="16" fill="#1f2937" stroke="#4b5563" strokeWidth="3" />
            <circle cx="55" cy="60" r="6" fill="#9ca3af" />
            
            {/* Connecting Rod */}
            <motion.rect 
                x="-5" y="55" width="70" height="6" rx={3} fill="#94a3b8" stroke="#475569"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
         </g>

         {/* Light */}
         <path d="M 90 35 L 98 30 L 98 40 Z" fill="#fbbf24" className="animate-pulse"/>
         <circle cx="90" cy="35" r="4" fill="#fff" />
         
         {/* Smoke particles (CSS animation handled by parent usually, simple SVG animation here) */}
         <circle cx="75" cy="0" r="3" fill="rgba(255,255,255,0.4)">
            <animate attributeName="cy" from="0" to="-20" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
         </circle>
      </g>

      {/* WAGONS */}
      {currentWord.split('').map((char, index) => {
          const x = WAGON_START_X + (index * WAGON_SPACING);
          const isLoaded = loadedLetters[index] !== null;
          
          return (
            <g key={index} transform={`translate(${x}, ${WAGON_Y_OFFSET})`}>
                {/* Coupler/Link */}
                <rect x={WAGON_SPACING - 12} y={35} width={24} height={4} fill="#1e293b" />
                
                {/* Buffers (Bumpers) */}
                <rect x={76} y={30} width={4} height={10} fill="#475569" rx={1} />
                <rect x={-4} y={30} width={4} height={10} fill="#475569" rx={1} />

                {/* Wagon Body (Flatbed with sides) */}
                <path d="M 0 30 L 0 45 L 80 45 L 80 30 L 80 25 L 0 25 Z" fill="#334155" stroke="#1e293b" strokeWidth={2} />
                {/* Detail stripe */}
                <rect x="5" y="32" width="70" height="6" fill="#475569" rx={1} />
                
                {/* Wheels (Bogies) */}
                <circle cx={15} cy={45} r={10} fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
                <circle cx={15} cy={45} r={3} fill="#6b7280" />
                <circle cx={65} cy={45} r={10} fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
                <circle cx={65} cy={45} r={3} fill="#6b7280" />

                {/* Ghost Letter (Target Hint on the bed) */}
                <text x={40} y={15} textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize="20" fontWeight="bold" className="font-mono select-none">
                    {char}
                </text>

                {/* Loaded Block (Crate) */}
                {isLoaded && (
                    <motion.g
                        initial={{ y: -60, opacity: 0, scale: 0.8 }}
                        animate={{ y: -22, opacity: 1, scale: 1 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                    >
                        {/* Crate Visual */}
                        <rect x={20} y={0} width={40} height={40} rx={6} fill={COLORS.blocks.loaded} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
                        {/* Inner highlight */}
                        <rect x={23} y={3} width={34} height={34} rx={4} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
                        
                        <text x={40} y={26} textAnchor="middle" dominantBaseline="middle" fill={COLORS.blocks.text} fontWeight="bold" fontSize="24" className="font-mono">
                            {loadedLetters[index]}
                        </text>
                    </motion.g>
                )}
            </g>
          );
      })}
    </motion.g>
  );
};