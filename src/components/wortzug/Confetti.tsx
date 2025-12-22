"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const Confetti: React.FC<{ x: number, y: number }> = ({ x, y }) => {
  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    angle: Math.random() * 360,
    dist: 50 + Math.random() * 100,
    size: 4 + Math.random() * 6,
    color: ['#fbbf24', '#22d3ee', '#34d399', '#f472b6'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.1
  }));

  return (
    <g transform={`translate(${x}, ${y})`}>
      {particles.map((p) => (
        <motion.rect
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{ 
            x: p.dist * Math.cos(p.angle * Math.PI / 180),
            y: p.dist * Math.sin(p.angle * Math.PI / 180),
            scale: [1, 1, 0],
            rotate: p.angle + 360,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 0.8, delay: p.delay, ease: "easeOut" }}
          width={p.size}
          height={p.size}
          fill={p.color}
          rx={1}
        />
      ))}
    </g>
  );
};