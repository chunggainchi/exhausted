import React from 'react';
import { Metadata } from 'next';
import SudokuGame from '@/components/sudoku/SudokuGame';

export const metadata: Metadata = {
    title: 'Kinder Sudoku - Spielen & Lernen',
    description: 'Ein farbenfrohes Sudoku-Spiel für Kinder. Löse Rätsel in verschiedenen Schwierigkeitsstufen (3x3, 4x4, 5x5).',
};

export default function SudokuPage() {
    return <SudokuGame />;
}
