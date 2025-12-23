"use client"; 

import React from 'react';
import { ViewState } from '../types';

interface HomeProps {
  setView: (v: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in">
      <div>
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 pb-2">
          CantoPlay 粵語
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mt-4">
          Lerne Kantonesisch spielerisch (auf Deutsch)
        </p>
        <div className="mt-6 inline-flex items-center px-4 py-2 bg-white/5 rounded-full border border-white/10 text-slate-300 text-sm">
          <span>🎯 Ziel: Hören • Sprechen • Sehen</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => setView('cards')}
          className="group relative p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all hover:-translate-y-1 active:scale-95"
        >
          <div className="flex items-center justify-center space-x-3 text-2xl font-bold text-white">
            <span>🃏</span>
            <span>Flashcards</span>
          </div>
        </button>

        <button
          onClick={() => setView('quiz')}
          className="group relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 transition-all hover:-translate-y-1 active:scale-95"
        >
          <div className="flex items-center justify-center space-x-3 text-2xl font-bold text-white">
            <span>🧠</span>
            <span>Quiz</span>
          </div>
        </button>

        <button
          onClick={() => setView('game')}
          className="group relative p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all hover:-translate-y-1 active:scale-95"
        >
          <div className="flex items-center justify-center space-x-3 text-2xl font-bold text-white">
            <span>🐭</span>
            <span>Maus & Käse</span>
          </div>
        </button>
      </div>

      <p className="text-slate-500 text-sm mt-8">
        Tipp: Tippe auf 🔊 oder Texte, um die Aussprache zu hören.
      </p>
    </div>
  );
};