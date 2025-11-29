'use client';

import React, { useState } from 'react';
import { AnatomyObject, categories } from '@/lib/anatomy-data';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameNavigationProps {
    objects: AnatomyObject[];
    onSelect: (object: AnatomyObject) => void;
    selectedObject: AnatomyObject | null;
}

export default function GameNavigation({ objects, onSelect, selectedObject }: GameNavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-[100] p-2 bg-zinc-800/80 backdrop-blur-md rounded-full text-white hover:bg-zinc-700 transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-80 bg-zinc-900 border-l border-zinc-800 z-[100] overflow-y-auto p-6 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Bibliothek</h2>

                            <div className="space-y-8">
                                {categories.map(category => (
                                    <div key={category}>
                                        <h3 className="text-sm font-bold text-green-500 uppercase tracking-wider mb-3">{category}</h3>
                                        <div className="space-y-2">
                                            {objects.filter(obj => obj.category === category).map(obj => (
                                                <button
                                                    key={obj.id}
                                                    onClick={() => {
                                                        onSelect(obj);
                                                        setIsOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${selectedObject?.id === obj.id
                                                        ? 'bg-zinc-800 text-white border border-zinc-700'
                                                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                                                        }`}
                                                >
                                                    <span>{obj.name}</span>
                                                    {selectedObject?.id === obj.id && <ChevronRight size={16} className="text-green-500" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
