"use client";

import React, { useState } from 'react';
import { THEMES, getWordsForTheme, PHOTO_URLS, WORDS } from '../data';
import { Word } from '../types';
import { speak } from '../services/audioService';

export const Flashcards: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [detailWord, setDetailWord] = useState<Word | null>(null);

  // Helper for consistent full-height layout
  const ViewContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex flex-col h-[calc(100vh-7rem)] md:h-[calc(100vh-6rem)] animate-fade-in ${className}`}>
      {children}
    </div>
  );

  // Detail View
  if (detailWord) {
    const list = activeTheme ? getWordsForTheme(activeTheme) : WORDS;
    const currentIndex = list.findIndex(w => w.id === detailWord.id);
    
    const goNext = () => {
      const next = list[(currentIndex + 1) % list.length];
      setDetailWord(next);
      speak(next.yue, 'yue');
    };
    
    const goPrev = () => {
      const prev = list[(currentIndex - 1 + list.length) % list.length];
      setDetailWord(prev);
      speak(prev.yue, 'yue');
    };

    return (
      <ViewContainer className="max-w-2xl mx-auto w-full">
        {/* Detail Header */}
        <div className="flex justify-between items-center mb-2 shrink-0">
          <button 
            onClick={() => setDetailWord(null)} 
            className="text-slate-300 hover:text-white flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/10 text-sm font-medium transition-colors"
          >
            ← Schließen
          </button>
          <span className="text-slate-500 text-xs font-mono">
            {currentIndex + 1} / {list.length}
          </span>
        </div>
        
        {/* Detail Card - Flexible Column */}
        <div className="flex-1 min-h-0 bg-slate-800/80 border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
          
          {/* Image Area - Takes remaining space */}
          <div className="flex-1 min-h-0 bg-slate-900 relative group">
            <img 
              src={PHOTO_URLS[detailWord.photo]} 
              alt={detailWord.en}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          </div>
          
          {/* Content Area - Fixed content at bottom */}
          <div className="shrink-0 p-4 md:p-6 bg-slate-800/95 border-t border-white/5 space-y-3 md:space-y-4">
            
            <div className="text-center">
               <h2 
                className="text-4xl md:text-5xl font-bold text-white mb-1 cursor-pointer active:scale-95 transition-transform inline-flex items-center gap-2"
                onClick={() => speak(detailWord.yue, 'yue')}
               >
                 {detailWord.yue} <span className="text-xl md:text-2xl text-slate-500">🔊</span>
               </h2>
               <div className="flex justify-center gap-4 text-lg md:text-xl">
                 <span className="text-cyan-400 font-medium" onClick={() => speak(detailWord.de, 'de')}>{detailWord.de}</span>
                 <span className="text-slate-500">•</span>
                 <span className="text-indigo-300" onClick={() => speak(detailWord.en, 'en')}>{detailWord.en}</span>
               </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2 pt-2 md:pt-4">
               <button onClick={goPrev} className="p-3 md:p-4 bg-slate-700/50 hover:bg-slate-600 rounded-xl text-xl transition-colors active:scale-95">⬅️</button>
               
               <div className="flex gap-2">
                  <button onClick={() => speak(detailWord.yue, 'yue')} className="px-3 md:px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-lg border border-purple-500/30 text-xs md:text-sm font-bold">HK 🇭🇰</button>
                  <button onClick={() => speak(detailWord.de, 'de')} className="px-3 md:px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 rounded-lg border border-cyan-500/30 text-xs md:text-sm font-bold">DE 🇩🇪</button>
                  <button onClick={() => speak(detailWord.en, 'en')} className="px-3 md:px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg border border-indigo-500/30 text-xs md:text-sm font-bold">EN 🇬🇧</button>
               </div>
               
               <button onClick={goNext} className="p-3 md:p-4 bg-slate-700/50 hover:bg-slate-600 rounded-xl text-xl transition-colors active:scale-95">➡️</button>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }

  // List View
  if (activeTheme) {
    const words = getWordsForTheme(activeTheme);
    const theme = THEMES.find(t => t.id === activeTheme);
    return (
      <ViewContainer>
        <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">{theme?.emoji}</span>
              <span>{theme?.label}</span>
            </h2>
            <button 
              onClick={() => setActiveTheme(null)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-sm font-medium transition-colors border border-white/10"
            >
              ← Themen
            </button>
        </div>
        
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 -mr-2 pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {words.map(w => (
              <div 
                key={w.id}
                onClick={() => {
                  setDetailWord(w);
                  speak(w.yue, 'yue');
                }}
                className="bg-slate-800/50 border border-white/5 rounded-xl p-3 hover:bg-slate-800 hover:border-cyan-500/50 active:scale-95 transition-all cursor-pointer group flex flex-col"
              >
                <div className="aspect-[4/3] w-full bg-slate-900 rounded-lg overflow-hidden mb-2 relative">
                  <img src={PHOTO_URLS[w.photo]} alt={w.de} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                    🔊
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">{w.yue}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{w.de}</p>
              </div>
            ))}
          </div>
        </div>
      </ViewContainer>
    );
  }

  // Theme Selection View
  return (
    <ViewContainer>
      <div className="shrink-0 mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Themen auswählen</h2>
        <p className="text-slate-400 text-sm md:text-base mt-1">Wähle eine Kategorie zum Lernen</p>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 -mr-2 pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {THEMES.map(t => {
             const count = getWordsForTheme(t.id).length;
             return (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                className="flex items-center p-4 md:p-5 bg-slate-800/40 border border-white/5 rounded-2xl hover:bg-slate-800 hover:border-purple-500/50 hover:shadow-lg transition-all active:scale-[0.98] text-left group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-slate-700/30 rounded-full text-2xl md:text-4xl mr-4 group-hover:scale-110 transition-transform bg-gradient-to-br from-white/5 to-white/0">
                  {t.emoji}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{t.label}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded-full">{count} Karten</span>
                  </div>
                </div>
                <div className="ml-auto text-slate-600 group-hover:text-purple-400 transition-colors">
                  ➔
                </div>
              </button>
             );
          })}
        </div>
      </div>
    </ViewContainer>
  );
};