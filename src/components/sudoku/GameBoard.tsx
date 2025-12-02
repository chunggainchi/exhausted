'use client';

import React from 'react';
import { Board } from '@/lib/sudoku/sudoku-logic';
import { motion } from 'framer-motion';

interface GameBoardProps {
    board: Board;
    initialBoard: Board;
    size: number;
    selectedCell: { row: number; col: number } | null;
    onCellClick: (row: number, col: number) => void;
    invalidCell: { row: number; col: number } | null;
}

const numberTextColors = [
    '',
    'text-red-500',
    'text-blue-500',
    'text-green-500',
    'text-yellow-600',
    'text-purple-500',
];

export default function GameBoard({
    board,
    initialBoard,
    size,
    selectedCell,
    onCellClick,
    invalidCell,
}: GameBoardProps) {
    return (
        <div
            className="grid gap-2 p-4 bg-white/10 rounded-2xl backdrop-blur-sm mx-auto"
            style={{
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                maxWidth: 'min(90vw, 400px)',
            }}
        >
            {board.map((row, r) =>
                row.map((cell, c) => {
                    const isInitial = initialBoard[r][c] !== null;
                    const isSelected = selectedCell?.row === r && selectedCell?.col === c;
                    const isInvalid = invalidCell?.row === r && invalidCell?.col === c;

                    // Determine border for 4x4 subgrids
                    let borderClasses = '';
                    if (size === 4) {
                        if (c === 1) borderClasses += ' border-r-4 border-zinc-400/50';
                        if (r === 1) borderClasses += ' border-b-4 border-zinc-400/50';
                    }

                    return (
                        <motion.button
                            key={`${r}-${c}`}
                            onClick={() => onCellClick(r, c)}
                            animate={isInvalid ? { x: [-5, 5, -5, 5, 0] } : {}}
                            transition={{ duration: 0.4 }}
                            className={`
                aspect-square rounded-lg flex items-center justify-center text-3xl font-bold
                transition-all relative
                ${isInitial ? 'bg-zinc-200' : 'bg-white'}
                ${isSelected ? 'ring-4 ring-green-400 z-10 scale-105' : ''}
                ${borderClasses}
              `}
                            disabled={isInitial}
                        >
                            {cell !== null && (
                                <span className={numberTextColors[cell]}>
                                    {cell}
                                </span>
                            )}
                        </motion.button>
                    );
                })
            )}
        </div>
    );
}
