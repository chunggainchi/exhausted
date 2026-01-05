"use client";

import React, { useState, useEffect } from 'react';
import { X, Calendar, Heart } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (date: Date, expectancy: number) => void;
    initialDate?: Date;
    initialExpectancy: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialDate,
    initialExpectancy
}) => {
    const [dateStr, setDateStr] = useState('');
    const [expectancyStr, setExpectancyStr] = useState('');

    // Initialize state when modal opens
    useEffect(() => {
        if (isOpen) {
            const d = initialDate
                ? initialDate.toISOString().split('T')[0]
                : '2000-01-01';
            setDateStr(d);
            setExpectancyStr(initialExpectancy.toString());
        }
    }, [isOpen, initialDate, initialExpectancy]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const date = new Date(dateStr);
        const exp = parseInt(expectancyStr, 10);

        // Basic validation
        if (!isNaN(date.getTime()) && !isNaN(exp) && exp > 0 && exp < 150) {
            onSave(date, exp);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-sm bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl p-6 animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold text-white mb-1">Journey Settings</h2>
                <p className="text-zinc-400 text-sm mb-6">Configure your life parameters to visualize your progress.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <Calendar size={14} />
                            Birth Date
                        </label>
                        <input
                            type="date"
                            required
                            value={dateStr}
                            onChange={(e) => setDateStr(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <Heart size={14} />
                            Life Expectancy (Years)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="120"
                            required
                            value={expectancyStr}
                            onChange={(e) => setExpectancyStr(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all mt-4"
                    >
                        Save Configuration
                    </button>
                </form>
            </div>
        </div>
    );
};