'use client';

import React from 'react';

interface LevelSelectorProps {
    onSelectLevel: (size: number) => void;
}

export default function LevelSelector({ onSelectLevel }: LevelSelectorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-4">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Wähle ein Level</h2>

            <button
                onClick={() => onSelectLevel(3)}
                className="w-64 py-6 bg-green-500 hover:bg-green-400 text-white rounded-2xl text-2xl font-bold shadow-[0_8px_0_rgb(21,128,61)] active:shadow-none active:translate-y-2 transition-all"
            >
                Einfach (1-3)
            </button>

            <button
                onClick={() => onSelectLevel(4)}
                className="w-64 py-6 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl text-2xl font-bold shadow-[0_8px_0_rgb(29,78,216)] active:shadow-none active:translate-y-2 transition-all"
            >
                Mittel (1-4)
            </button>

            <button
                onClick={() => onSelectLevel(5)}
                className="w-64 py-6 bg-purple-500 hover:bg-purple-400 text-white rounded-2xl text-2xl font-bold shadow-[0_8px_0_rgb(126,34,206)] active:shadow-none active:translate-y-2 transition-all"
            >
                Schwer (1-5)
            </button>
        </div>
    );
}
