"use client";

import React, { useState } from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  currentView: ViewState;
  setView: (v: ViewState) => void;
  children: React.ReactNode;
}

const NAV_ITEMS: { id: ViewState; label: string; emoji: string }[] = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'cards', label: 'Flashcards', emoji: '🃏' },
  { id: 'quiz', label: 'Quiz', emoji: '🧠' },
  { id: 'game', label: 'Game', emoji: '🐭' },
];

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full bg-slate-900 bg-opacity-40 p-4">
      <div className="flex items-center justify-center mb-8 mt-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.location.href="https://exhaustedrocket.com"}>
         <img 
           src="/images/logo.svg" 
           alt="CantoPlay" 
           className="h-20 w-auto object-contain"
         />
      </div>
      <nav className="flex-1 space-y-3">
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="mr-3 text-xl">{item.emoji}</span>
              <span className="font-medium text-lg">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-[#0d1117] text-[#e6ebf2]">
      {/* Background Gradients (CSS replacement for canvas background) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[20%] right-[30%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl" />
         <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 z-20 h-screen sticky top-0 border-r border-slate-800 backdrop-blur-sm">
        <NavContent />
      </div>

      {/* Mobile Header & Burger */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 p-4 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="pointer-events-auto p-2 bg-slate-800/80 backdrop-blur-md rounded-lg text-white shadow-lg border border-slate-700 active:scale-95 transition-transform"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 h-full bg-slate-900 border-r border-slate-800 shadow-2xl animate-slide-in-left">
             <NavContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto h-screen p-4 md:p-8 pt-20 md:pt-8 scroll-smooth">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};