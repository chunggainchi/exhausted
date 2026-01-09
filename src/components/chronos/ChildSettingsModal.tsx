"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Baby, Calendar, Palette } from 'lucide-react';
import { Child } from './types';

interface ChildSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (children: Child[]) => void;
    initialChildren: Child[];
}

export const ChildSettingsModal: React.FC<ChildSettingsModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialChildren
}) => {
    const [children, setChildren] = useState<Child[]>([]);

    const CHILD_COLORS = [
        { name: 'Orange', value: '#FB923C' },
        { name: 'Blue', value: '#60A5FA' },
        { name: 'Green', value: '#4ADE80' },
        { name: 'Purple', value: '#C084FC' },
        { name: 'Pink', value: '#F472B6' },
        { name: 'Teal', value: '#2DD4BF' },
        { name: 'Yellow', value: '#FACC15' },
        { name: 'Red', value: '#F87171' },
    ];

    useEffect(() => {
        if (isOpen) {
            setChildren(initialChildren || []);
        }
    }, [isOpen, initialChildren]);

    const handleAddChild = () => {
        const newChild: Child = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            birthDate: new Date(),
            color: CHILD_COLORS[children.length % CHILD_COLORS.length].value
        };
        setChildren([...children, newChild]);
    };

    const handleRemoveChild = (id: string) => {
        setChildren(children.filter(c => c.id !== id));
    };

    const handleUpdateChild = (id: string, updates: Partial<Child>) => {
        setChildren(children.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation: Ensure all have names and valid dates
        const validChildren = children.filter(c => c.name.trim() !== '' && !isNaN(new Date(c.birthDate).getTime()));
        onSave(validChildren);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={onClose}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-lg bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-start flex-none">
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-1">My Children</h2>
                                <p className="text-zinc-400 text-sm">Track the 12 years of childhood magic.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content area - scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            <form id="child-settings-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Children Profiles</h3>
                                        <button
                                            type="button"
                                            onClick={handleAddChild}
                                            className="flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
                                        >
                                            <Plus size={14} />
                                            Add Child
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <AnimatePresence mode="popLayout">
                                            {children.map((child) => (
                                                <motion.div
                                                    key={child.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4 relative group"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-1 space-y-4">
                                                            {/* Name and Color */}
                                                            <div className="flex flex-col sm:flex-row gap-4">
                                                                <div className="flex-1 space-y-1.5">
                                                                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase">
                                                                        <Baby size={10} /> Name
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        required
                                                                        value={child.name}
                                                                        onChange={(e) => handleUpdateChild(child.id, { name: e.target.value })}
                                                                        placeholder="Child's Name"
                                                                        className="w-full bg-transparent border-b border-zinc-800 focus:border-orange-500 text-sm py-1 outline-none transition-colors text-white"
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase">
                                                                        <Palette size={10} /> Color
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        {CHILD_COLORS.slice(0, 5).map(c => (
                                                                            <button
                                                                                key={c.value}
                                                                                type="button"
                                                                                onClick={() => handleUpdateChild(child.id, { color: c.value })}
                                                                                className={`w-5 h-5 rounded-full transition-transform hover:scale-125 ${child.color === c.value ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' : ''}`}
                                                                                style={{ backgroundColor: c.value }}
                                                                                title={c.name}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Birthdate */}
                                                            <div className="space-y-1.5">
                                                                <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase">
                                                                    <Calendar size={10} /> Birth Date
                                                                </div>
                                                                <input
                                                                    type="date"
                                                                    required
                                                                    value={child.birthDate instanceof Date && !isNaN(child.birthDate.getTime()) ? child.birthDate.toISOString().split('T')[0] : ''}
                                                                    onChange={(e) => {
                                                                        const d = new Date(e.target.value);
                                                                        if (!isNaN(d.getTime())) handleUpdateChild(child.id, { birthDate: d });
                                                                    }}
                                                                    className="w-full bg-zinc-800/50 rounded px-3 py-2 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-orange-500/50"
                                                                />
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveChild(child.id)}
                                                            className="p-2 text-zinc-600 hover:text-red-400 transition-colors mt-2"
                                                            title="Remove Child"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {children.length === 0 && (
                                            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl">
                                                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-3 text-zinc-700">
                                                    <Baby size={24} />
                                                </div>
                                                <p className="text-zinc-500 text-sm">No children profiles yet.</p>
                                                <button
                                                    type="button"
                                                    onClick={handleAddChild}
                                                    className="text-xs text-orange-400 hover:underline mt-1"
                                                >
                                                    Add your first child
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-zinc-800 flex-none">
                            <button
                                form="child-settings-form"
                                type="submit"
                                className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all"
                            >
                                Save Profiles
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
