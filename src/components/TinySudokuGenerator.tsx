'use client';

import React, { useState, useEffect } from 'react';
import { Printer, Loader2, Sparkles, RefreshCcw } from 'lucide-react';
import SimpleHeader from './SimpleHeader';

// ========= Types =========

type CellValue = 1 | 2 | 3 | 4 | null;
type SudokuGrid = CellValue[][];

interface SudokuPuzzle {
    id: string;
    initialGrid: SudokuGrid;
    solution: SudokuGrid;
}

interface PrintablePageData {
    puzzles: SudokuPuzzle[];
}

enum Difficulty {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
}

// ========= Sudoku Logic (pure functions) =========

const generateEmptyGrid = (): SudokuGrid =>
    Array.from({ length: 4 }, () =>
        Array<CellValue>(4).fill(null)
    );

const isValid = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
    // Row
    for (let x = 0; x < 4; x++) {
        if (grid[row][x] === num) return false;
    }
    // Column
    for (let x = 0; x < 4; x++) {
        if (grid[x][col] === num) return false;
    }
    // 2x2 box
    const startRow = row - (row % 2);
    const startCol = col - (col % 2);
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            if (grid[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
};

const solveSudoku = (grid: SudokuGrid): boolean => {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === null) {
                // Randomize order of 1–4 for variation
                const nums = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
                for (const num of nums) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num as CellValue;
                        if (solveSudoku(grid)) return true;
                        grid[row][col] = null;
                    }
                }
                return false;
            }
        }
    }
    return true;
};

const removeNumbers = (grid: SudokuGrid, difficulty: Difficulty): SudokuGrid => {
    const newGrid: SudokuGrid = grid.map(row => [...row]);

    // Easy: 3–4 holes, Medium: 4–6 holes (can adjust as you like)
    const [minHoles, maxHoles] =
        difficulty === Difficulty.EASY ? [3, 4] : [4, 6];

    const targetHoles =
        Math.floor(Math.random() * (maxHoles - minHoles + 1)) + minHoles;

    let removed = 0;
    while (removed < targetHoles) {
        const row = Math.floor(Math.random() * 4);
        const col = Math.floor(Math.random() * 4);
        if (newGrid[row][col] !== null) {
            newGrid[row][col] = null;
            removed++;
        }
    }

    return newGrid;
};

const generateSudoku = (difficulty: Difficulty): SudokuPuzzle => {
    const solution = generateEmptyGrid();
    solveSudoku(solution); // fills in-place, valid 4x4 solution

    const initialGrid = removeNumbers(solution, difficulty);

    return {
        id: Math.random().toString(36).slice(2),
        initialGrid,
        solution: solution.map(row => [...row]),
    };
};

const generateBatch = (count: number, difficulty: Difficulty): SudokuPuzzle[] =>
    Array.from({ length: count }, () => generateSudoku(difficulty));

// ========= Number SVG styling =========

const PatternDefinitions: React.FC = () => (
    <svg width="0" height="0" className="absolute hidden">
        <defs>
            {/* 1: dots */}
            <pattern id="pattern-1" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="2" fill="#334155" />
            </pattern>

            {/* 2: diagonal stripes */}
            <pattern id="pattern-2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#334155" strokeWidth="2" />
            </pattern>

            {/* 3: grid/checker */}
            <pattern id="pattern-3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M0,5 h10 M5,0 v10" stroke="#334155" strokeWidth="1.5" />
            </pattern>

            {/* 4: waves */}
            <pattern id="pattern-4" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                <path d="M0,5 Q5,0 10,5 T20,5" fill="none" stroke="#334155" strokeWidth="2" />
            </pattern>
        </defs>
    </svg>
);

interface NumberDisplayProps {
    value: CellValue;
    className?: string;
}

// Simple bubbly-ish paths for numbers 1–4
const numberPaths: Record<1 | 2 | 3 | 4, string> = {
    1: 'M35 15 L50 10 L50 85 M30 85 L70 85',
    2: 'M30 30 C30 10, 70 10, 70 35 C70 55, 30 65, 30 85 L75 85',
    3: 'M30 20 L70 20 L45 45 L70 70 C70 90, 30 90, 30 70',
    4: 'M60 85 L60 15 L25 60 L75 60',
};

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value, className }) => {
    if (!value) return null;

    const path = numberPaths[value];

    return (
        <svg viewBox="0 0 100 100" className={`w-full h-full overflow-visible ${className ?? ''}`}>
            {/* Thick base outline */}
            <path
                d={path}
                fill="none"
                stroke="black"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Pattern stroke for recognisability in B&W */}
            <path
                d={path}
                fill="none"
                stroke={`url(#pattern-${value})`}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* crisp outer outline */}
            <path
                d={path}
                fill="none"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// ========= Sudoku grid component =========

interface SudokuGridProps {
    grid: SudokuGrid;
}

const SudokuGridComponent: React.FC<SudokuGridProps> = ({ grid }) => {
    return (
        <div className="relative border-4 border-black rounded-xl overflow-hidden bg-white shadow-sm w-full aspect-square mx-auto">
            {/* 2x2 thick borders */}
            <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-2 grid-rows-2">
                <div className="border-r-4 border-b-4 border-black" />
                <div className="border-b-4 border-black" />
                <div className="border-r-4 border-black" />
                <div />
            </div>

            {/* Cells */}
            <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
                {grid.map((row, rIndex) =>
                    row.map((val, cIndex) => (
                        <div
                            key={`${rIndex}-${cIndex}`}
                            className={`
                relative flex items-center justify-center 
                border border-slate-300
              `}
                        >
                            <div className="w-4/5 h-4/5">
                                <NumberDisplay value={val} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// ========= Main component =========

const TinySudokuGenerator: React.FC = () => {
    const [data, setData] = useState<PrintablePageData | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(4);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);

    const generateNew = async () => {
        setLoading(true);

        // Tiny UX delay so user notices change (optional)
        await new Promise(resolve => setTimeout(resolve, 400));

        try {
            const safeCount = Math.min(20, Math.max(1, count || 1));
            const puzzles = generateBatch(safeCount, difficulty);
            setData({ puzzles });
        } catch (err) {
            console.error('Failed to generate puzzles', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* local styles (fonts + print) – you can move this to globals if you prefer */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600&family=Patrick+Hand&display=swap');
        
        body {
          font-family: 'Fredoka', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .handwritten {
          font-family: 'Patrick Hand', cursive;
        }
        @media print {
          @page { margin: 0.5cm; }
          .no-print { display: none !important; }
          .print-break-inside-avoid { break-inside: avoid; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

            <PatternDefinitions />

            {/* Blog Header - hidden when printing */}
            <div className="no-print">
                <SimpleHeader />
            </div>

            {/* Controls */}
            <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-4 shadow-sm">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* logo/title */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                            <Sparkles size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Tiny Sudoku Generator
                        </h1>
                    </div>

                    {/* control group */}
                    <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {/* how many puzzles */}
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-2">
                                Puzzles
                            </span>
                            {[1, 4].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setCount(num)}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${count === num
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        {/* difficulty */}
                        <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 p-1">
                            <button
                                onClick={() => setDifficulty(Difficulty.EASY)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${difficulty === Difficulty.EASY
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                Easy
                            </button>
                            <button
                                onClick={() => setDifficulty(Difficulty.MEDIUM)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${difficulty === Difficulty.MEDIUM
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                Medium
                            </button>
                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            disabled={!data || loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-full hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95"
                        >
                            <Printer size={18} />
                            Print
                        </button>
                        <button
                            onClick={generateNew}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <RefreshCcw size={18} />}
                            Generate
                        </button>
                    </div>
                </div>
            </header>

            {/* Content / printable area */}
            <main className="flex-1 p-6 md:p-8 flex justify-center">
                {loading && !data ? (
                    <div className="flex flex-col items-center justify-center text-slate-400 mt-20">
                        <Loader2 className="w-12 h-12 animate-spin mb-4" />
                        <p className="text-lg animate-pulse">Creating a fun puzzle for you...</p>
                    </div>
                ) : data ? (
                    <div className="w-full max-w-4xl bg-white shadow-xl print:shadow-none p-8 md:p-12 print:p-0 rounded-2xl min-h-[11in] print:min-h-0 print:w-full">
                        {/* sheet header */}
                        <div className="text-center mb-10 border-b-2 border-slate-100 pb-6 print:mb-6 print:pb-4">
                            <h2 className="text-4xl print:text-5xl font-bold text-slate-800 mb-3 handwritten print:text-black">
                                Fun-size Sudoku
                            </h2>
                            <div className="text-lg text-slate-500 handwritten print:text-slate-700 max-w-2xl mx-auto leading-relaxed">
                                Fill the empty squares so that every row, column, and 2×2 box contains the numbers 1, 2, 3, and 4.
                            </div>
                        </div>

                        {/* puzzle grid layout */}
                        <div className={`grid gap-8 print:gap-8 ${count === 1
                            ? 'grid-cols-1 place-items-center'
                            : 'grid-cols-1 sm:grid-cols-2'
                            }`}>
                            {data.puzzles.map((puzzle, idx) => (
                                <div key={puzzle.id} className={`flex flex-col items-center print-break-inside-avoid ${count === 1 ? 'w-full max-w-[600px]' : ''
                                    }`}>
                                    <div className={`mb-2 text-slate-300 font-bold print:text-slate-400 ${count === 1 ? 'text-2xl' : 'text-lg'
                                        }`}>
                                        Puzzle #{idx + 1}
                                    </div>
                                    <SudokuGridComponent grid={puzzle.initialGrid} />
                                </div>
                            ))}
                        </div>

                        {/* footer */}
                        <div className="mt-16 text-center print:fixed print:bottom-4 print:left-0 print:w-full">
                            <p className="text-xs text-slate-300 font-light font-mono">
                                exhaustedrocket.com – big learning fun for little geniuses
                            </p>
                        </div>
                    </div>
                ) : null}
            </main>
        </div>
    );
};

export default TinySudokuGenerator;
