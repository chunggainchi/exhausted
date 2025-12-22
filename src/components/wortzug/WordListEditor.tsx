"use client";
import React, { useState } from 'react';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordListEditorProps {
  words: string[];
  onAdd: (word: string) => { success: boolean; error?: string };
  onRemove: (word: string) => void;
  onReset: () => void;
}

export const WordListEditor: React.FC<WordListEditorProps> = ({ words, onAdd, onRemove, onReset }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    const result = onAdd(inputValue);
    if (result.success) {
      setInputValue('');
      setError(null);
    } else {
      setError(result.error || "Invalid word");
    }
  };

  const avgLength = Math.round(words.reduce((acc, w) => acc + w.length, 0) / (words.length || 1));

  return (
    <div className="flex flex-col h-full w-full">
      {/* Input Area - Fixed at top */}
      <div className="bg-slate-800 p-4 rounded-xl mb-3 border border-slate-700 flex-shrink-0">
        <form onSubmit={handleAdd} className="flex gap-2">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value.toUpperCase());
                    setError(null);
                }}
                placeholder="ADD NEW WORD (e.g. MAMA)"
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-base uppercase shadow-inner"
                maxLength={12}
            />
            <button 
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors flex items-center justify-center shadow-lg hover:shadow-cyan-500/20"
            >
                <Plus size={24} />
            </button>
        </form>
        {error && (
            <motion.div 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm mt-2 font-bold"
            >
                <AlertCircle size={16} />
                {error}
            </motion.div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-2 mb-2 font-mono uppercase tracking-wider flex-shrink-0">
        <div className="flex gap-4">
            <span>Count: <span className="text-slate-200">{words.length}</span></span>
            <span>Avg Len: <span className="text-slate-200">{avgLength}</span></span>
        </div>
        <span className={`px-2 py-0.5 rounded ${avgLength <= 4 ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
            {avgLength <= 4 ? "Level: Easy" : "Level: Advanced"}
        </span>
      </div>

      {/* Word Grid - Scrollable Area */}
      {/* overflow-y-auto enables scrolling, flex-1 fills remaining height */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-2 pb-2 custom-scrollbar">
         {words.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                 <AlertCircle size={40} className="opacity-50" />
                 <p className="text-lg">List is empty</p>
                 <button onClick={onReset} className="text-cyan-400 underline hover:text-cyan-300">Restore Defaults</button>
             </div>
         ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-4">
                <AnimatePresence initial={false}>
                    {words.map((word) => (
                        <motion.div
                            key={word}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex justify-between items-center group hover:border-slate-500 hover:bg-slate-750 transition-all select-none shadow-sm"
                        >
                            <span className="font-mono font-bold text-slate-200 text-lg truncate mr-2 tracking-wide">{word}</span>
                            <button
                                onClick={() => onRemove(word)}
                                className="text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded p-1.5 transition-colors focus:opacity-100 active:opacity-100"
                                aria-label={`Remove ${word}`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
         )}
      </div>

      {/* Footer / Reset - Fixed at bottom */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex-shrink-0">
          {!showConfirmReset ? (
             <button 
                onClick={() => setShowConfirmReset(true)}
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-2 transition-colors py-2 px-1"
             >
                 <RotateCcwIcon size={14} /> Reset to Default List
             </button>
          ) : (
             <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-red-900/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                 <div className="flex items-center gap-2">
                     <AlertCircle size={16} className="text-red-400" />
                     <span className="text-sm text-red-300 font-bold">Reset to original list?</span>
                 </div>
                 <div className="flex gap-2">
                     <button onClick={() => setShowConfirmReset(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-white font-medium">Cancel</button>
                     <button 
                        onClick={() => {
                            onReset();
                            setShowConfirmReset(false);
                        }} 
                        className="px-4 py-1.5 text-xs bg-red-500 hover:bg-red-400 text-white rounded font-bold shadow-lg shadow-red-500/20"
                    >
                        Confirm Reset
                    </button>
                 </div>
             </div>
          )}
      </div>
    </div>
  );
};

const RotateCcwIcon = ({ size }: { size: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} height={size} 
        viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
        <path d="M3 3v9h9" />
    </svg>
);