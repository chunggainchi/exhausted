import React from 'react';
import { Metadata } from 'next';
import SudokuGame from '@/components/sudoku/SudokuGame';

export const metadata: Metadata = {
    title: 'Sudoku for Kids',
    description: 'A colorful Sudoku game for kids. Solve puzzles in different difficulty levels (3x3, 4x4, 5x5).',
};

export default function SudokuPage() {
    return <SudokuGame />;
}
