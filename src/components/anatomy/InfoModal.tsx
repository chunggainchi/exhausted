'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

export default function InfoModal({ isOpen, onClose, title, description }: InfoModalProps) {
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen && (e.key === 'Enter' || e.key === 'Escape')) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-6">{description}</p>

                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-full transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
