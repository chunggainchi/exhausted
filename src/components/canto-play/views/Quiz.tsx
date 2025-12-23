"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import { WORDS, THEMES, getWordsForTheme, PHOTO_URLS } from '../data';
import { Word } from '../types';
import { speak, fxPositive, fxNegative } from '../services/audioService';

export const Quiz: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);

  const generateQuestion = () => {
    setWrongId(null);
    const pool = selectedThemeId ? getWordsForTheme(selectedThemeId) : WORDS;
    if (pool.length < 4) return; // Safety check

    const correct = pool[Math.floor(Math.random() * pool.length)];
    const distractorPool = pool.filter(w => w.id !== correct.id);
    const distractors = distractorPool.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const opts = [correct, ...distractors].sort(() => 0.5 - Math.random());
    
    setCurrentWord(correct);
    setOptions(opts);
    speak(correct.yue, 'yue');
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThemeId]);

  const handleGuess = (w: Word) => {
    if (!currentWord) return;
    
    if (w.id === currentWord.id) {
      fxPositive();
      setScore(s => s + 1);
      setStreak(s => Math.min(10, s + 1));
      if (streak >= 9) {
        alert("🎉 Super! Du hast 10 Punkte erreicht!");
        setScore(0);
        setStreak(0);
      }
      setTimeout(generateQuestion, 400);
    } else {
      fxNegative();
      setWrongId(w.id);
      setStreak(0);
    }
  };

  if (!currentWord) return <div className="text-white flex items-center justify-center h-full">Laden...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] md:h-[calc(100vh-6rem)] animate-fade-in max-w-4xl mx-auto">
       {/* 1. Compact Header Bar */}
       <div className="flex items-center justify-between bg-slate-800/40 p-2 md:p-3 rounded-xl border border-white/5 shrink-0 mb-2 md:mb-4">
          <div className="flex items-center gap-3">
             <div className="text-2xl">🧠</div>
             <div className="leading-none">
                <h2 className="font-bold text-white text-base md:text-lg">Quiz</h2>
                <span className="text-[10px] md:text-xs text-slate-400 hidden sm:inline">Wähle das richtige Bild</span>
             </div>
          </div>
          
          <select 
             className="bg-slate-900 border border-white/10 rounded-lg text-white text-xs md:text-sm px-2 md:px-3 py-1.5 outline-none cursor-pointer hover:border-white/30 transition-colors max-w-[140px] md:max-w-xs truncate"
             onChange={(e) => {
               setSelectedThemeId(e.target.value || null);
               setScore(0);
               setStreak(0);
             }}
             value={selectedThemeId || ""}
           >
             <option value="">🌐 Alle Themen</option>
             {THEMES.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.label}</option>)}
           </select>
       </div>

       {/* 2. Question Section (Compact) */}
       <div className="flex flex-col items-center justify-center shrink-0 mb-3 md:mb-4 space-y-2">
           <div className="relative group">
              <h1 
                className="text-5xl md:text-6xl font-bold text-white cursor-pointer hover:text-cyan-300 transition-colors text-center"
                onClick={() => speak(currentWord.yue, 'yue')}
              >
                {currentWord.yue}
              </h1>
              <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xl cursor-pointer" onClick={() => speak(currentWord.yue, 'yue')}>
                 🔊
              </div>
           </div>
           
           <div className="flex gap-2">
              <button onClick={() => speak(currentWord.yue, 'yue')} className="px-3 py-1 text-xs md:text-sm bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg border border-white/5 transition-colors flex items-center gap-1">HK 🇭🇰 <span className="md:hidden">🔊</span></button>
              <button onClick={() => speak(currentWord.de, 'de')} className="px-3 py-1 text-xs md:text-sm bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg border border-white/5 transition-colors">DE 🇩🇪</button>
              <button onClick={() => speak(currentWord.en, 'en')} className="px-3 py-1 text-xs md:text-sm bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg border border-white/5 transition-colors">EN 🇬🇧</button>
           </div>
       </div>

       {/* 3. Grid Section (Flexible Height) */}
       <div className="flex-1 min-h-0 grid grid-cols-2 gap-2 md:gap-4">
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleGuess(opt)}
              disabled={wrongId === opt.id}
              className={`
                relative w-full h-full rounded-xl overflow-hidden border-2 transition-all duration-200 bg-slate-800
                ${wrongId === opt.id 
                  ? 'border-red-500 opacity-50 grayscale' 
                  : 'border-transparent hover:border-cyan-400 hover:shadow-lg active:scale-[0.98]'
                }
              `}
            >
              <img src={PHOTO_URLS[opt.photo]} alt="option" className="w-full h-full object-cover" />
              {wrongId === opt.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                   <span className="text-5xl">❌</span>
                </div>
              )}
            </button>
          ))}
       </div>

       {/* 4. Footer Progress */}
       <div className="mt-3 shrink-0">
          <div className="bg-slate-800 rounded-full h-4 md:h-5 relative overflow-hidden">
             <div 
               className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-out"
               style={{ width: `${(streak / 10) * 100}%` }}
             />
             <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] md:text-xs font-bold text-white/90 uppercase tracking-widest">
               <span>Punkte: {score}</span>
               <span className="flex items-center gap-1">🏆 {streak}/10</span>
             </div>
          </div>
       </div>
    </div>
  );
};