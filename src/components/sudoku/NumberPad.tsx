'use client';

import React from 'react';

interface NumberPadProps {
    size: number;
    onNumberClick: (num: number) => void;
}

const numberColors = [
    '', // 0 unused
    'bg-red-500 shadow-red-700',
    'bg-blue-500 shadow-blue-700',
    'bg-green-500 shadow-green-700',
    'bg-yellow-500 shadow-yellow-700',
    'bg-purple-500 shadow-purple-700',
];

export default function NumberPad({ size, onNumberClick }: NumberPadProps) {
    const numbers = Array.from({ length: size }, (_, i) => i + 1);

    return (
        <div className="flex gap-4 justify-center w-full max-w-md mx-auto p-4">
            {numbers.map((num) => (
                <button
                    key={num}
                    onClick={() => onNumberClick(num)}
                    className={`
            flex-1 aspect-square max-w-[80px] rounded-xl text-3xl font-bold text-white
            ${numberColors[num]}
            shadow-[0_6px_0_rgba(0,0,0,0.2)]
            active:shadow-none active:translate-y-1.5
            transition-all
          `}
                >
                    {num}
                </button>
            ))}
        </div>
    );
}
