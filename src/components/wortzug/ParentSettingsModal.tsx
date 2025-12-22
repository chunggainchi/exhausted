"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { X, Settings, BookOpen, Info } from 'lucide-react';
import { WordListEditor } from './WordListEditor';

interface ParentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  words: string[];
  onAddWord: (word: string) => { success: boolean; error?: string };
  onRemoveWord: (word: string) => void;
  onResetWords: () => void;
}

export const ParentSettingsModal: React.FC<ParentSettingsModalProps> = ({
  isOpen, onClose, words, onAddWord, onRemoveWord, onResetWords
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        // Changed to max-w-4xl for more width
        // Changed height to fixed h-[80vh] so the internal scroll area calculates correctly against a fixed parent
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50 rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-3">
                <div className="bg-slate-800 p-2 rounded-lg text-cyan-400">
                    <Settings size={24} />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">Parent Settings</h2>
                    <p className="text-xs sm:text-sm text-slate-400">Manage game content</p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
                <X size={28} />
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-cyan-400 uppercase tracking-widest flex-shrink-0">
                <BookOpen size={18} />
                <span>Word List Configuration</span>
            </div>
            
            <p className="text-sm text-slate-400 mb-4 flex-shrink-0">
                Customize the words your child learns. Changes are saved automatically to this device.
            </p>

            {/* Editor Wrapper - flex-1 ensures it takes all remaining space */}
            <div className="flex-1 min-h-0 bg-slate-950/50 rounded-xl border border-slate-800 p-4 overflow-hidden flex flex-col">
                <WordListEditor 
                    words={words}
                    onAdd={onAddWord}
                    onRemove={onRemoveWord}
                    onReset={onResetWords}
                />
            </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950/30 border-t border-slate-800 rounded-b-2xl flex items-center gap-3 text-xs text-slate-500 flex-shrink-0">
            <Info size={16} />
            <p className="truncate">Privacy: Data is stored locally. No server upload.</p>
        </div>
      </motion.div>
    </div>
  );
};