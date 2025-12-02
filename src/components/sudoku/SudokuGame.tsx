'use client';

import React, { useState } from 'react';
import { generateGame, LEVELS, Grid } from '@/lib/sudoku/sudoku-logic';
import { soundEngine } from '@/lib/sudoku/audio-engine';
import { Sparkles, Trophy, Home, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { Fredoka } from 'next/font/google';
import Confetti from './Confetti';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '600', '700'] });

// Utility for styles
const NumberColors: Record<number, string> = {
    1: 'text-red-500',
    2: 'text-blue-500',
    3: 'text-green-600',
    4: 'text-orange-500',
    5: 'text-purple-600',
};

const ButtonColors: Record<number, string> = {
    1: 'bg-red-100 border-red-300 text-red-600 hover:bg-red-200',
    2: 'bg-blue-100 border-blue-300 text-blue-600 hover:bg-blue-200',
    3: 'bg-green-100 border-green-300 text-green-600 hover:bg-green-200',
    4: 'bg-orange-100 border-orange-300 text-orange-600 hover:bg-orange-200',
    5: 'bg-purple-100 border-purple-300 text-purple-600 hover:bg-purple-200',
};

export default function SudokuGame() {
    const [screen, setScreen] = useState<'menu' | 'game'>('menu');
    const [levelId, setLevelId] = useState(1);
    const [board, setBoard] = useState<Grid>([]);
    const [initialBoard, setInitialBoard] = useState<Grid>([]);
    const [solution, setSolution] = useState<Grid>([]);
    const [selectedCell, setSelectedCell] = useState<{ r: number, c: number } | null>(null);
    const [isWon, setIsWon] = useState(false);
    const [shakeCell, setShakeCell] = useState<{ r: number, c: number } | null>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const startGame = (id: number) => {
        soundEngine.init();
        const { puzzle, solution: solved } = generateGame(id);
        setBoard(puzzle.map(row => [...row]));
        setInitialBoard(puzzle.map(row => [...row]));
        setSolution(solved);
        setLevelId(id);
        setScreen('game');
        setIsWon(false);
        setSelectedCell(null);
        soundEngine.playSelect();
    };

    const handleCellClick = (r: number, c: number) => {
        if (initialBoard[r][c] !== 0) {
            soundEngine.playSelect();
            return;
        }
        soundEngine.playSelect();
        setSelectedCell({ r, c });
    };

    const handleNumberInput = (num: number) => {
        if (!selectedCell || isWon) return;

        const { r, c } = selectedCell;
        const correctVal = solution[r][c];

        if (num === correctVal) {
            const newBoard = [...board];
            newBoard[r] = [...newBoard[r]];
            newBoard[r][c] = num;
            setBoard(newBoard);

            // Check win
            let filled = 0;
            const size = newBoard.length;
            for (let i = 0; i < size; i++)
                for (let j = 0; j < size; j++)
                    if (newBoard[i][j] !== 0) filled++;

            if (filled === size * size) {
                setIsWon(true);
                soundEngine.playWin();
                setSelectedCell(null);
            } else {
                soundEngine.playSuccess();
                setSelectedCell(null);
            }
        } else {
            soundEngine.playError();
            setShakeCell({ r, c });
            setTimeout(() => setShakeCell(null), 500);
        }
    };

    const toggleSound = () => {
        const newState = soundEngine.toggle();
        setSoundEnabled(newState);
    };

    const currentLevel = LEVELS.find(l => l.id === levelId) || LEVELS[0];

    if (screen === 'menu') {
        return (
            <div className={`flex flex-col items-center justify-center min-h-screen p-6 bg-yellow-50 relative overflow-hidden ${fredoka.className}`}>
                <div className="absolute top-10 left-10 text-yellow-200 transform -rotate-12"><Sparkles size={80} /></div>
                <div className="absolute bottom-10 right-10 text-yellow-200 transform rotate-12"><Sparkles size={100} /></div>

                <h1 className="text-5xl font-bold text-slate-800 mb-2 tracking-tight text-center">Sudoku</h1>
                <h2 className="text-3xl font-bold text-slate-600 mb-10 tracking-tight text-center">for small geniuses</h2>

                <div className="grid gap-6 w-full max-w-xs relative z-10">
                    {LEVELS.map((level) => (
                        <button
                            key={level.id}
                            onClick={() => startGame(level.id)}
                            className={`${level.color} relative group overflow-hidden rounded-2xl p-6 shadow-xl transition-transform transform hover:scale-105 active:scale-95`}
                        >
                            <div className="flex items-center justify-between z-10 relative">
                                <div className="text-left">
                                    <span className="block text-white text-3xl font-bold drop-shadow-md">{level.name}</span>
                                    <span className="text-white/90 text-sm font-semibold">Numbers 1-{level.maxNumber}</span>
                                </div>
                                <div className="bg-white/20 p-3 rounded-full text-white">
                                    <span className="text-2xl font-bold">{level.size}x{level.size}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full bg-yellow-50 relative min-h-screen overflow-hidden ${fredoka.className}`}>
            {isWon && <Confetti />}

            {/* Header */}
            <header className="flex items-center justify-between p-4 pb-2">
                <button
                    onClick={() => setScreen('menu')}
                    className="p-3 bg-white rounded-xl shadow-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <Home size={28} />
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Level</span>
                    <span className={`text-2xl font-bold ${currentLevel.color.replace('bg-', 'text-').replace('400', '600')}`}>
                        {currentLevel.name}
                    </span>
                </div>

                <button
                    onClick={toggleSound}
                    className="p-3 bg-white rounded-xl shadow-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    {soundEnabled ? <Volume2 size={28} /> : <VolumeX size={28} />}
                </button>
            </header>

            {/* Game Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 relative">

                {/* Win State Message */}
                {isWon && (
                    <div className="absolute inset-0 z-40 bg-black/10 flex items-center justify-center backdrop-blur-[2px] rounded-3xl">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-pop mx-4">
                            <Trophy size={80} className="text-yellow-400 mb-4 drop-shadow-sm" />
                            <h2 className="text-4xl font-bold text-slate-800 mb-2">You Did It!</h2>
                            <p className="text-slate-500 mb-6 font-semibold">Great job, superstar!</p>
                            <button
                                onClick={() => startGame(levelId)}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={24} />
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Board */}
                <div
                    className="grid gap-2 bg-white p-3 rounded-2xl shadow-xl border-4 border-slate-200"
                    style={{
                        gridTemplateColumns: `repeat(${currentLevel.size}, 1fr)`,
                        width: 'min(90vw, 400px)',
                        aspectRatio: '1/1'
                    }}
                >
                    {board.map((row, r) =>
                        row.map((num, c) => {
                            const isInitial = initialBoard[r][c] !== 0;
                            const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                            const isShaking = shakeCell?.r === r && shakeCell?.c === c;

                            let borderClass = "";
                            if (currentLevel.hasBlocks && currentLevel.size === 4) {
                                if (c === 1) borderClass += " border-r-4 border-slate-200 ";
                                if (r === 1) borderClass += " border-b-4 border-slate-200 ";
                            }

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    onClick={() => handleCellClick(r, c)}
                                    className={`
                    relative flex items-center justify-center text-4xl font-bold rounded-xl transition-all duration-200 select-none
                    ${isInitial ? 'bg-slate-100' : 'bg-white cursor-pointer hover:bg-slate-50'}
                    ${isSelected ? 'ring-4 ring-yellow-400 z-10 transform scale-105 shadow-lg' : ''}
                    ${isShaking ? 'animate-shake bg-red-100 ring-2 ring-red-400' : ''}
                    ${borderClass}
                  `}
                                >
                                    {num !== 0 && (
                                        <span className={`
                      ${NumberColors[num]} 
                      ${!isInitial && 'animate-pop'}
                      drop-shadow-sm
                    `}>
                                            {num}
                                        </span>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            {/* Input Pad */}
            <footer className="p-4 pb-8 w-full max-w-md mx-auto">
                <div className="grid grid-cols-5 gap-3">
                    {Array.from({ length: currentLevel.maxNumber }).map((_, i) => {
                        const n = i + 1;
                        return (
                            <button
                                key={n}
                                onClick={() => handleNumberInput(n)}
                                disabled={!selectedCell}
                                className={`
                  aspect-square rounded-2xl text-3xl font-bold shadow-md transition-all active:scale-90
                  flex items-center justify-center border-b-4
                  ${ButtonColors[n]}
                  ${!selectedCell ? 'opacity-50 grayscale cursor-not-allowed' : 'opacity-100'}
                `}
                            >
                                {n}
                            </button>
                        );
                    })}
                </div>
            </footer>
        </div>
    );
}
