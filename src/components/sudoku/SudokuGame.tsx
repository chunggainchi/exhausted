'use client';

import React, { useState, useCallback } from 'react';
import { generatePuzzle, isValidMove, checkWin, Board } from '@/lib/sudoku/sudoku-logic';
import { soundEngine } from '@/lib/sudoku/audio-engine';
import LevelSelector from './LevelSelector';
import GameBoard from './GameBoard';
import NumberPad from './NumberPad';
import Confetti from './Confetti';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function SudokuGame() {
    const [level, setLevel] = useState<number | null>(null);
    const [board, setBoard] = useState<Board>([]);
    const [initialBoard, setInitialBoard] = useState<Board>([]);
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [invalidCell, setInvalidCell] = useState<{ row: number; col: number } | null>(null);
    const [isSolved, setIsSolved] = useState(false);

    const startNewGame = useCallback((size: number) => {
        const { initial } = generatePuzzle(size);
        setBoard(initial.map(row => [...row]));
        setInitialBoard(initial.map(row => [...row]));
        setLevel(size);
        setIsSolved(false);
        setSelectedCell(null);
        soundEngine.playPop();
    }, []);

    const handleCellClick = (row: number, col: number) => {
        if (initialBoard[row][col] !== null) return; // Cannot select fixed cells
        setSelectedCell({ row, col });
        soundEngine.playPop();
    };

    const handleNumberInput = (num: number) => {
        if (!selectedCell || level === null) return;
        const { row, col } = selectedCell;

        // Validate move
        if (isValidMove(board, row, col, num, level)) {
            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = num;
            setBoard(newBoard);
            soundEngine.playDing();

            // Check win
            if (checkWin(newBoard, level)) {
                setIsSolved(true);
                soundEngine.playFanfare();
            }
        } else {
            // Invalid move
            setInvalidCell({ row, col });
            soundEngine.playError();
            setTimeout(() => setInvalidCell(null), 500);
        }
    };

    if (!level) {
        return <LevelSelector onSelectLevel={startNewGame} />;
    }

    return (
        <div className="min-h-screen bg-zinc-900 flex flex-col items-center py-8 relative overflow-hidden">
            {isSolved && <Confetti />}

            {/* Header */}
            <div className="w-full max-w-md px-4 flex justify-between items-center mb-8">
                <button
                    onClick={() => setLevel(null)}
                    className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-white">
                    Level 1-{level}
                </h1>
                <button
                    onClick={() => startNewGame(level)}
                    className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            {/* Game Board */}
            <div className="flex-1 flex flex-col justify-center w-full">
                <GameBoard
                    board={board}
                    initialBoard={initialBoard}
                    size={level}
                    selectedCell={selectedCell}
                    onCellClick={handleCellClick}
                    invalidCell={invalidCell}
                />
            </div>

            {/* Input */}
            <div className="mt-auto w-full pb-8">
                <NumberPad size={level} onNumberClick={handleNumberInput} />
            </div>

            {/* Success Message */}
            {isSolved && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-40">
                    <div className="bg-white p-8 rounded-3xl text-center shadow-2xl transform scale-110">
                        <h2 className="text-4xl font-bold text-green-500 mb-4">Super! 🎉</h2>
                        <p className="text-zinc-600 mb-8 text-xl">Du hast es geschafft!</p>
                        <button
                            onClick={() => startNewGame(level)}
                            className="px-8 py-4 bg-green-500 text-white rounded-xl text-xl font-bold hover:bg-green-400 transition-colors shadow-lg"
                        >
                            Nochmal spielen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
