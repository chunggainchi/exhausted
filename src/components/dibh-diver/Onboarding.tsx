'use client';

import React, { useState } from 'react';
import { audioController } from './audio';

interface OnboardingProps {
  onComplete: (name: string, ageGroup: 'child' | 'adult') => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<'child' | 'adult'>('adult');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      audioController.playClick();
      onComplete(name.trim(), ageGroup);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] p-4 animate-fade-in">
      <div className="w-full max-w-md bg-[#163853] border-4 border-[#203c56] shadow-2xl p-6 md:p-10 relative overflow-hidden">

        {/* Decorative Corner */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#4cc9f0]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ff9f1c]"></div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0d2b45] border-2 border-[#4cc9f0] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(76,201,240,0.3)]">
            <span className="text-3xl">🪪</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-widest mb-2">
            Identify Yourself
          </h2>
          <p className="text-[#8da9c4] font-mono text-xs md:text-sm uppercase tracking-wider">
            Enter Agent Callsign for Mission Records
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 12))} // Limit char count
              placeholder="AGENT NAME"
              className="w-full bg-[#0d2b45] border-2 border-[#203c56] text-center text-white font-bold text-xl p-4 outline-none focus:border-[#ff9f1c] focus:shadow-[0_0_15px_rgba(255,159,28,0.2)] transition-all placeholder:text-gray-600 uppercase font-mono"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono pointer-events-none">
              {name.length}/12
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[#8da9c4] font-mono text-[10px] uppercase tracking-widest text-center">Select Profile Type</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { audioController.playClick(); setAgeGroup('child'); }}
                className={`flex-1 py-3 px-2 border-2 font-black uppercase text-sm transition-all ${ageGroup === 'child'
                    ? 'bg-[#ff9f1c] border-white text-[#0d2b45] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]'
                    : 'bg-[#0d2b45] border-[#203c56] text-[#8da9c4] opacity-60 hover:opacity-100'
                  }`}
              >
                👶 Child
              </button>
              <button
                type="button"
                onClick={() => { audioController.playClick(); setAgeGroup('adult'); }}
                className={`flex-1 py-3 px-2 border-2 font-black uppercase text-sm transition-all ${ageGroup === 'adult'
                    ? 'bg-[#4cc9f0] border-white text-[#0d2b45] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]'
                    : 'bg-[#0d2b45] border-[#203c56] text-[#8da9c4] opacity-60 hover:opacity-100'
                  }`}
              >
                🎖️ Adult
              </button>
            </div>
            <p className="text-[10px] text-center font-mono text-gray-400 uppercase italic">
              {ageGroup === 'child' ? "* Mission complexity reduced for junior divers" : "* Standard mission complexity for veterans"}
            </p>
          </div>

          <button
            type="submit"
            disabled={name.length === 0}
            className={`w-full py-4 font-black uppercase tracking-widest text-lg transition-all border-2 
              ${name.length > 0
                ? 'bg-[#4cc9f0] border-white text-[#0d2b45] hover:bg-[#48cae4] hover:scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]'
                : 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed opacity-50'}`}
          >
            Confirm Identity
          </button>
        </form>

      </div>
    </div>
  );
}