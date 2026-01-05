"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Heart, Plus, Trash2, Tag, Star, GraduationCap, Briefcase, Baby, Home, Plane, Trophy } from 'lucide-react';
import { LifeEvent, LifeMilestone } from './types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (date: Date, expectancy: number, events: LifeEvent[], milestones: LifeMilestone[]) => void;
    initialDate?: Date;
    initialExpectancy: number;
    initialEvents: LifeEvent[];
    initialMilestones: LifeMilestone[];
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialDate,
    initialExpectancy,
    initialEvents,
    initialMilestones
}) => {
    const [dateStr, setDateStr] = useState('');
    const [expectancyStr, setExpectancyStr] = useState('');
    const [events, setEvents] = useState<LifeEvent[]>([]);
    const [milestones, setMilestones] = useState<LifeMilestone[]>([]);

    const EVENT_COLORS = [
        { name: 'Orange', value: '#FB923C' },
        { name: 'Blue', value: '#60A5FA' },
        { name: 'Green', value: '#4ADE80' },
        { name: 'Purple', value: '#C084FC' },
        { name: 'Pink', value: '#F472B6' },
        { name: 'Teal', value: '#2DD4BF' },
    ];
    const MILESTONE_ICONS = [
        { name: 'Star', value: 'star', icon: Star },
        { name: 'Heart', value: 'heart', icon: Heart },
        { name: 'Graduation', value: 'graduation', icon: GraduationCap },
        { name: 'Work', value: 'work', icon: Briefcase },
        { name: 'Baby', value: 'baby', icon: Baby },
        { name: 'Home', value: 'home', icon: Home },
        { name: 'Travel', value: 'travel', icon: Plane },
        { name: 'Trophy', value: 'trophy', icon: Trophy },
    ];

    // Initialize state when modal opens
    useEffect(() => {
        if (isOpen) {
            const d = initialDate
                ? initialDate.toISOString().split('T')[0]
                : '2000-01-01';
            setDateStr(d);
            setExpectancyStr(initialExpectancy.toString());
            setEvents(initialEvents || []);
            setMilestones(initialMilestones || []);
        }
    }, [isOpen, initialDate, initialExpectancy, initialEvents, initialMilestones]);

    const handleAddEvent = () => {
        const newEvent: LifeEvent = {
            id: Math.random().toString(36).substr(2, 9),
            label: 'New Phase',
            startDate: new Date(),
            endDate: undefined,
            color: EVENT_COLORS[0].value
        };
        setEvents([...events, newEvent]);
    };

    const handleRemoveEvent = (id: string) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const handleUpdateEvent = (id: string, updates: Partial<LifeEvent>) => {
        setEvents(events.map(e => e.id === id ? { ...e, ...updates } : e));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const date = new Date(dateStr);
        const exp = parseInt(expectancyStr, 10);

        // Basic validation
        if (!isNaN(date.getTime()) && !isNaN(exp) && exp > 0 && exp < 150) {
            onSave(date, exp, events, milestones);
            onClose();
        }
    };

    const handleAddMilestone = () => {
        const newMilestone: LifeMilestone = {
            id: Math.random().toString(36).substr(2, 9),
            label: 'New Milestone',
            date: new Date(),
            icon: 'star'
        };
        setMilestones([...milestones, newMilestone]);
    };

    const handleRemoveMilestone = (id: string) => {
        setMilestones(milestones.filter(m => m.id !== id));
    };

    const handleUpdateMilestone = (id: string, updates: Partial<LifeMilestone>) => {
        setMilestones(milestones.map(m => m.id === id ? { ...m, ...updates } : m));
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
                                <h2 className="text-xl font-semibold text-white mb-1">Journey Settings</h2>
                                <p className="text-zinc-400 text-sm">Configure your life parameters and key phases.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content area - scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
                                {/* Core Parameters Section */}
                                <div className="space-y-4">
                                    <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Parameters</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                                                <Calendar size={14} />
                                                Birth Date
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={dateStr}
                                                onChange={(e) => setDateStr(e.target.value)}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono text-base"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                                                <Heart size={14} />
                                                Expectancy (Years)
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="120"
                                                required
                                                value={expectancyStr}
                                                onChange={(e) => setExpectancyStr(e.target.value)}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono text-base"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Life Phases Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Life Phases</h3>
                                        <button
                                            type="button"
                                            onClick={handleAddEvent}
                                            className="flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
                                        >
                                            <Plus size={14} />
                                            Add Phase
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <AnimatePresence mode="popLayout">
                                            {events.map((event) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4 relative group"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-1 space-y-4">
                                                            {/* Label and Color Row */}
                                                            <div className="flex flex-col sm:flex-row gap-4">
                                                                <div className="flex-1 space-y-1.5">
                                                                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase">
                                                                        <Tag size={10} /> Label
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        value={event.label}
                                                                        onChange={(e) => handleUpdateEvent(event.id, { label: e.target.value })}
                                                                        placeholder="e.g. University"
                                                                        className="w-full bg-transparent border-b border-zinc-800 focus:border-orange-500 text-sm py-1 outline-none transition-colors"
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <div className="text-[10px] font-medium text-zinc-500 uppercase">Color</div>
                                                                    <div className="flex gap-2">
                                                                        {EVENT_COLORS.map(c => (
                                                                            <button
                                                                                key={c.value}
                                                                                type="button"
                                                                                onClick={() => handleUpdateEvent(event.id, { color: c.value })}
                                                                                className={`w-5 h-5 rounded-full transition-transform hover:scale-125 ${event.color === c.value ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' : ''}`}
                                                                                style={{ backgroundColor: c.value }}
                                                                                title={c.name}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Dates Row */}
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-1.5">
                                                                    <div className="text-[10px] font-medium text-zinc-500 uppercase">Start</div>
                                                                    <input
                                                                        type="date"
                                                                        value={event.startDate instanceof Date && !isNaN(event.startDate.getTime()) ? event.startDate.toISOString().split('T')[0] : ''}
                                                                        onChange={(e) => {
                                                                            const d = new Date(e.target.value);
                                                                            if (!isNaN(d.getTime())) handleUpdateEvent(event.id, { startDate: d });
                                                                        }}
                                                                        className="w-full bg-zinc-800/50 rounded px-2 py-1 text-xs text-zinc-200 outline-none focus:ring-1 focus:ring-orange-500/50"
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <div className="text-[10px] font-medium text-zinc-500 uppercase">End</div>
                                                                    <input
                                                                        type="date"
                                                                        value={event.endDate instanceof Date && !isNaN(event.endDate.getTime()) ? event.endDate.toISOString().split('T')[0] : ''}
                                                                        onChange={(e) => {
                                                                            const d = new Date(e.target.value);
                                                                            if (e.target.value === '') handleUpdateEvent(event.id, { endDate: undefined });
                                                                            else if (!isNaN(d.getTime())) handleUpdateEvent(event.id, { endDate: d });
                                                                        }}
                                                                        className="w-full bg-zinc-800/50 rounded px-2 py-1 text-xs text-zinc-200 outline-none focus:ring-1 focus:ring-orange-500/50"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveEvent(event.id)}
                                                            className="p-2 text-zinc-600 hover:text-red-400 transition-colors mt-4"
                                                            title="Remove Phase"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {events.length === 0 && (
                                            <div className="text-center py-8 border-2 border-dashed border-zinc-800 rounded-xl">
                                                <p className="text-zinc-500 text-sm">No life phases defined yet.</p>
                                                <button
                                                    type="button"
                                                    onClick={handleAddEvent}
                                                    className="text-xs text-orange-400 hover:underline mt-1"
                                                >
                                                    Add your first one
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Life Milestones Section */}
                                <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Milestones</h3>
                                            <p className="text-[10px] text-zinc-600">Specific moments in time.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddMilestone}
                                            className="flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
                                        >
                                            <Plus size={14} />
                                            Add Milestone
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <AnimatePresence mode="popLayout">
                                            {milestones.map((m) => (
                                                <motion.div
                                                    key={m.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="p-3 bg-zinc-900/30 border border-zinc-800/80 rounded-lg flex items-center gap-4"
                                                >
                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex flex-col sm:flex-row gap-4">
                                                            <div className="flex-1 space-y-1.5">
                                                                <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 uppercase">
                                                                    <Tag size={10} /> Label
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    value={m.label}
                                                                    onChange={(e) => handleUpdateMilestone(m.id, { label: e.target.value })}
                                                                    placeholder="e.g. Graduation"
                                                                    className="w-full bg-transparent border-b border-zinc-800 focus:border-orange-500 text-sm py-1 outline-none transition-colors"
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <div className="text-[10px] font-medium text-zinc-500 uppercase">Icon</div>
                                                                <div className="flex gap-1.5">
                                                                    {MILESTONE_ICONS.map(mi => (
                                                                        <button
                                                                            key={mi.value}
                                                                            type="button"
                                                                            onClick={() => handleUpdateMilestone(m.id, { icon: mi.value })}
                                                                            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${m.icon === mi.value ? 'bg-zinc-800 text-orange-400 ring-1 ring-orange-500/50' : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50'}`}
                                                                            title={mi.name}
                                                                        >
                                                                            <mi.icon size={14} />
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex-1 space-y-1">
                                                                <div className="text-[9px] text-zinc-600 uppercase font-bold">Date</div>
                                                                <input
                                                                    type="date"
                                                                    value={m.date instanceof Date && !isNaN(m.date.getTime()) ? m.date.toISOString().split('T')[0] : (m.date as unknown as string).split('T')[0]}
                                                                    onChange={(e) => {
                                                                        const d = new Date(e.target.value);
                                                                        if (!isNaN(d.getTime())) handleUpdateMilestone(m.id, { date: d });
                                                                    }}
                                                                    className="w-full bg-zinc-800/50 rounded px-2 py-1 text-xs text-zinc-200 outline-none focus:ring-1 focus:ring-orange-500/50"
                                                                />
                                                            </div>
                                                            <div className="flex-none pt-4">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveMilestone(m.id)}
                                                                    className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-zinc-800 flex-none">
                            <button
                                form="settings-form"
                                type="submit"
                                className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all"
                            >
                                Save Visualization
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};