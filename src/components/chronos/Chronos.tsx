"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ViewMode, TimeStats, ThemeConfig, LifeEvent, LifeMilestone, Child, Parent } from './types';
import { calculateStats } from './utils/dateUtils';
import { StatsHeader } from './StatsHeader';
import { TimeGrid } from './TimeGrid';
import { QuoteFooter } from './QuoteFooter';
import { SettingsModal } from './SettingsModal';
import { ChildSettingsModal } from './ChildSettingsModal';
import { ParentSettingsModal } from './ParentSettingsModal';

// --- SINGLE THEME DEFINITION (Inferno/Orange) ---
const THEME: ThemeConfig = {
    name: 'Inferno',
    textGradient: 'from-orange-400 to-red-500',
    hue: 25, // Pure Orange
    saturation: 100,
    pulseColor: '#FB923C' // Orange-400
};

// Helper to generate theme from child color
const getChildTheme = (color: string): ThemeConfig => {
    // Basic Hex to HSL conversion to drive the TimeDot logic
    let r = 0, g = 0, b = 0;
    if (color.length === 7) {
        r = parseInt(color.slice(1, 3), 16) / 255;
        g = parseInt(color.slice(3, 5), 16) / 255;
        b = parseInt(color.slice(5, 7), 16) / 255;
    }
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0;

    // let l = (max + min) / 2; // unused for now, TimeDot handles lightness

    if (max !== min) {
        const d = max - min;
        // s = d / (1 - Math.abs(max + min - 1)); // We might vary saturation based on logic, but let's take calculated
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        name: 'ChildTheme',
        textGradient: `from-[${color}] to-[${color}]`, // Fallback/Hack for text
        hue: Math.round(h * 360),
        saturation: 90, // Boost saturation for vibrancy
        pulseColor: color
    };
};

export const Chronos: React.FC = () => {
    // State
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day);
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [lifeExpectancy, setLifeExpectancy] = useState<number>(80);
    // ... stats logic
    const [stats, setStats] = useState<TimeStats>(calculateStats(ViewMode.Day));
    const [scrubPercentage, setScrubPercentage] = useState<number | null>(null);
    const [isZenMode, setIsZenMode] = useState(false);
    const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
    const [lifeMilestones, setLifeMilestones] = useState<LifeMilestone[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Child Mode State
    const [children, setChildren] = useState<Child[]>([]);
    const [activeChildId, setActiveChildId] = useState<string | null>(null);
    const [isChildSettingsOpen, setIsChildSettingsOpen] = useState(false);

    // Parent Mode State
    const [parents, setParents] = useState<Parent[]>([]);
    const [activeParentId, setActiveParentId] = useState<string | null>(null);
    const [isParentSettingsOpen, setIsParentSettingsOpen] = useState(false);

    const [mounted, setMounted] = useState(false);

    // Initialize
    useEffect(() => {
        const savedBirth = localStorage.getItem('tempo_birthDate');
        const savedExpectancy = localStorage.getItem('tempo_lifeExpectancy');
        const savedView = localStorage.getItem('tempo_viewMode');

        if (savedBirth) {
            const d = new Date(savedBirth);
            if (!isNaN(d.getTime())) setBirthDate(d);
        }
        if (savedExpectancy) {
            const e = parseInt(savedExpectancy, 10);
            if (!isNaN(e)) setLifeExpectancy(e);
        }
        if (savedView) setViewMode(savedView as ViewMode);

        const savedEvents = localStorage.getItem('tempo_lifeEvents');
        if (savedEvents) {
            try {
                const parsed = JSON.parse(savedEvents);
                const decoded = parsed.map((ev: { startDate: string; endDate?: string; id: string; label: string; color: string }) => ({
                    ...ev,
                    startDate: new Date(ev.startDate),
                    endDate: ev.endDate ? new Date(ev.endDate) : undefined
                }));
                setLifeEvents(decoded);
            } catch (e) {
                console.error('Failed to parse life events', e);
            }
        }

        const savedMilestones = localStorage.getItem('tempo_lifeMilestones');
        if (savedMilestones) {
            try {
                const parsed = JSON.parse(savedMilestones);
                const decoded = parsed.map((m: { date: string; id: string; label: string; icon?: string }) => ({
                    ...m,
                    date: new Date(m.date)
                }));
                setLifeMilestones(decoded);
            } catch (e) {
                console.error('Failed to parse life milestones', e);
            }
        }

        const savedChildren = localStorage.getItem('tempo_children');
        if (savedChildren) {
            try {
                const parsed = JSON.parse(savedChildren);
                const decoded = parsed.map((c: { id: string; name: string; birthDate: string; color: string }) => ({
                    ...c,
                    birthDate: new Date(c.birthDate)
                }));
                setChildren(decoded);
                if (decoded.length > 0) {
                    setActiveChildId(decoded[0].id);
                }
            } catch (e) {
                console.error('Failed to parse children', e);
            }
        }

        const savedParents = localStorage.getItem('tempo_parents');
        if (savedParents) {
            try {
                const parsed = JSON.parse(savedParents);
                const decoded = parsed.map((p: { id: string; name: string; birthDate: string; color: string; lifeExpectancy?: number }) => ({
                    ...p,
                    birthDate: new Date(p.birthDate)
                }));
                setParents(decoded);
                if (decoded.length > 0) {
                    setActiveParentId(decoded[0].id);
                }
            } catch (e) {
                console.error('Failed to parse parents', e);
            }
        }

        setMounted(true);
    }, []);

    // Unified Stats Management
    useEffect(() => {
        const updateStats = () => {
            let realStats: TimeStats;

            if (viewMode === ViewMode.Child) {
                const activeChild = children.find(c => c.id === activeChildId) || children[0];
                if (activeChild) {
                    realStats = calculateStats(ViewMode.Child, activeChild.birthDate, 12, [], []);
                    realStats.label = `Weeks left w/ ${activeChild.name}`;
                } else {
                    realStats = calculateStats(ViewMode.Child, new Date(), 12, [], []);
                    realStats.label = 'Weeks Left';
                    realStats.percentage = 0;
                    realStats.passedUnits = 0;
                }
            } else if (viewMode === ViewMode.Parent) {
                const activeParent = parents.find(p => p.id === activeParentId) || parents[0];
                if (activeParent) {
                    // Start counting from Parent's birth, using their specific life expectancy (default 85)
                    realStats = calculateStats(ViewMode.Parent, activeParent.birthDate, activeParent.lifeExpectancy || 85, [], []);
                    realStats.label = `Years left w/ ${activeParent.name}`;
                } else {
                    realStats = calculateStats(ViewMode.Parent, new Date(), 85, [], []);
                    realStats.label = 'Years Left';
                    realStats.percentage = 0;
                    realStats.passedUnits = 0;
                }
            } else {
                realStats = calculateStats(viewMode, birthDate, lifeExpectancy, lifeEvents, lifeMilestones);
            }

            if (scrubPercentage !== null) {
                const total = realStats.totalUnits;
                const fakePassed = Math.floor(scrubPercentage * total);
                setStats({
                    ...realStats,
                    passedUnits: fakePassed,
                    currentUnitIndex: fakePassed,
                    percentage: scrubPercentage * 100,
                    daysLeft: total - fakePassed,
                    currentUnitProgress: 50,
                });
            } else {
                setStats(realStats);
            }
        };

        updateStats();
        if (scrubPercentage === null) {
            const interval = setInterval(updateStats, 1000);
            return () => clearInterval(interval);
        }
    }, [viewMode, birthDate, lifeExpectancy, scrubPercentage, lifeEvents, lifeMilestones, children, activeChildId, parents, activeParentId]);

    // Dynamic Label Calculation for Scrubbing
    const scrubLabel = useMemo(() => {
        if (scrubPercentage === null) return null;

        if (viewMode === ViewMode.Life) {
            const totalMonths = lifeExpectancy * 12;
            const targetMonthIndex = Math.floor(scrubPercentage * totalMonths);

            const bDate = birthDate || new Date('2000-01-01');
            const targetDate = new Date(bDate);
            targetDate.setMonth(bDate.getMonth() + targetMonthIndex);

            const age = (targetMonthIndex / 12).toFixed(1);
            const monthName = targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            return `Age ${age} • ${monthName}`;
        }

        if (viewMode === ViewMode.Child) {
            const years = 12;
            const totalWeeks = Math.round(years * 52.1775);
            const targetWeekIndex = Math.floor(scrubPercentage * totalWeeks);
            const age = (targetWeekIndex / 52.1775).toFixed(1);
            return `Age ${age} • Week ${targetWeekIndex}`;
        }

        if (viewMode === ViewMode.Parent) {
            const activeParent = parents.find(p => p.id === activeParentId) || parents[0];
            const years = activeParent?.lifeExpectancy || 85;
            const totalMonths = years * 12;
            const targetMonthIndex = Math.floor(scrubPercentage * totalMonths);
            const age = (targetMonthIndex / 12).toFixed(1);
            return `Age ${age} • Month ${targetMonthIndex}`;
        }

        // For both Day and Week views...
        const year = new Date().getFullYear();
        const isLeap = ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0);
        const totalDays = isLeap ? 366 : 365;

        const dayIndex = Math.min(Math.floor(scrubPercentage * totalDays), totalDays - 1);
        const targetDate = new Date(year, 0, 1 + dayIndex);

        return targetDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    }, [scrubPercentage, viewMode, birthDate, lifeExpectancy, parents, activeParentId]);

    const handleSaveSettings = (date: Date, expectancy: number, events: LifeEvent[], milestones: LifeMilestone[]) => {
        setBirthDate(date);
        setLifeExpectancy(expectancy);
        setLifeEvents(events);
        setLifeMilestones(milestones);
        localStorage.setItem('tempo_birthDate', date.toISOString());
        localStorage.setItem('tempo_lifeExpectancy', expectancy.toString());
        localStorage.setItem('tempo_lifeEvents', JSON.stringify(events));
        localStorage.setItem('tempo_lifeMilestones', JSON.stringify(milestones));
    };

    const handleSaveChildren = (newChildren: Child[]) => {
        setChildren(newChildren);
        localStorage.setItem('tempo_children', JSON.stringify(newChildren));
        if (!activeChildId || !newChildren.find(c => c.id === activeChildId)) {
            setActiveChildId(newChildren.length > 0 ? newChildren[0].id : null);
        }
    };

    const handleSaveParents = (newParents: Parent[]) => {
        setParents(newParents);
        localStorage.setItem('tempo_parents', JSON.stringify(newParents));
        if (!activeParentId || !newParents.find(p => p.id === activeParentId)) {
            setActiveParentId(newParents.length > 0 ? newParents[0].id : null);
        }
    };

    const handleViewModeChange = (mode: ViewMode) => {
        if (mode === ViewMode.Life) {
            const savedBirth = localStorage.getItem('tempo_birthDate');
            const hasValidSavedDate = savedBirth && !isNaN(new Date(savedBirth).getTime());
            const hasValidStateDate = birthDate && !isNaN(birthDate.getTime());

            if (!hasValidStateDate && !hasValidSavedDate) {
                setIsSettingsOpen(true);
            }
        }
        if (mode === ViewMode.Child) {
            if (children.length === 0) {
                setIsChildSettingsOpen(true);
            }
        }
        if (mode === ViewMode.Parent) {
            if (parents.length === 0) {
                setIsParentSettingsOpen(true);
            }
        }
        setViewMode(mode);
    };

    if (!mounted) return null;

    // Helper for rendering the correct TimeGrid content
    const renderContent = () => {
        if (viewMode === ViewMode.Child) {
            if (children.length === 0) {
                return (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <p className="text-zinc-500 text-lg">No children profiles found.</p>
                        <button
                            onClick={() => setIsChildSettingsOpen(true)}
                            className="text-orange-400 hover:text-orange-300 font-medium"
                        >
                            Configure Children
                        </button>
                    </div>
                );
            }

            const activeChild = children.find(c => c.id === activeChildId) || children[0];

            return (
                <div className="w-full h-full flex flex-col">
                    {/* Child Tabs */}
                    {children.length > 1 && (
                        <div className="flex-none flex justify-center mb-4 transition-all">
                            <div className="flex p-1 bg-zinc-900/80 border border-zinc-800 rounded-lg backdrop-blur-sm">
                                {children.map(child => (
                                    <button
                                        key={child.id}
                                        onClick={() => setActiveChildId(child.id)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${activeChildId === child.id ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: child.color }} />
                                        {child.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Single Large Grid for Active Child */}
                    <div className="flex-1 min-h-0 relative">
                        <TimeGrid
                            viewMode={ViewMode.Child}
                            stats={stats}
                            theme={getChildTheme(activeChild.color)}
                            birthDate={activeChild.birthDate}
                            onScrub={isZenMode ? undefined : setScrubPercentage}
                        />
                    </div>
                </div>
            );
        }

        if (viewMode === ViewMode.Parent) {
            if (parents.length === 0) {
                return (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <p className="text-zinc-500 text-lg">No parent profiles found.</p>
                        <button
                            onClick={() => setIsParentSettingsOpen(true)}
                            className="text-orange-400 hover:text-orange-300 font-medium"
                        >
                            Configure Parents
                        </button>
                    </div>
                );
            }

            const activeParent = parents.find(p => p.id === activeParentId) || parents[0];

            return (
                <div className="w-full h-full flex flex-col">
                    {/* Parent Tabs */}
                    {parents.length > 1 && (
                        <div className="flex-none flex justify-center mb-4 transition-all">
                            <div className="flex p-1 bg-zinc-900/80 border border-zinc-800 rounded-lg backdrop-blur-sm">
                                {parents.map(parent => (
                                    <button
                                        key={parent.id}
                                        onClick={() => setActiveParentId(parent.id)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${activeParentId === parent.id ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: parent.color }} />
                                        {parent.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Grid for Active Parent */}
                    <div className="flex-1 min-h-0 relative">
                        <TimeGrid
                            viewMode={ViewMode.Parent}
                            stats={stats}
                            theme={getChildTheme(activeParent.color)}
                            birthDate={activeParent.birthDate}
                            onScrub={isZenMode ? undefined : setScrubPercentage}
                        />
                    </div>
                </div>
            );
        }

        return (
            <TimeGrid
                viewMode={viewMode}
                stats={stats}
                theme={THEME}
                birthDate={birthDate}
                onScrub={isZenMode ? undefined : setScrubPercentage}
            />
        );
    };

    return (
        <div
            className="h-[100dvh] w-full bg-[#050505] text-zinc-100 selection:bg-white/20 overflow-hidden flex flex-col touch-manipulation font-sans"
            onDoubleClick={() => setIsZenMode(p => !p)}
        >
            {/* Modals and Background */}
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSave={handleSaveSettings}
                initialDate={birthDate}
                initialExpectancy={lifeExpectancy}
                initialEvents={lifeEvents}
                initialMilestones={lifeMilestones}
            />
            <ChildSettingsModal
                isOpen={isChildSettingsOpen}
                onClose={() => setIsChildSettingsOpen(false)}
                onSave={handleSaveChildren}
                initialChildren={children}
            />
            <ParentSettingsModal
                isOpen={isParentSettingsOpen}
                onClose={() => setIsParentSettingsOpen(false)}
                onSave={handleSaveParents}
                initialParents={parents}
            />
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-gradient-to-b from-orange-500/[0.05] to-transparent opacity-50 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col h-full w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className={`flex-none pt-4 sm:pt-6 pb-2 transition-all duration-500 ${isZenMode ? '-translate-y-full opacity-0 pointer-events-none absolute' : 'translate-y-0 opacity-100'}`}>
                    <StatsHeader
                        stats={stats}
                        viewMode={viewMode}
                        onViewModeChange={handleViewModeChange}
                        year={new Date().getFullYear()}
                        themeConfig={(viewMode === ViewMode.Child && children.length > 0 && activeChildId)
                            ? getChildTheme((children.find(c => c.id === activeChildId) || children[0]).color)
                            : (viewMode === ViewMode.Parent && parents.length > 0 && activeParentId)
                                ? getChildTheme((parents.find(p => p.id === activeParentId) || parents[0]).color)
                                : THEME}
                        onLifeSettings={() => viewMode === ViewMode.Child ? setIsChildSettingsOpen(true) : (viewMode === ViewMode.Parent ? setIsParentSettingsOpen(true) : setIsSettingsOpen(true))}
                        customSubtext={scrubLabel}
                    />
                </header>

                <main className={`flex-1 min-h-0 w-full relative flex items-center justify-center py-2 sm:py-4 transition-all duration-700 ${isZenMode ? 'scale-105' : 'scale-100'}`}>
                    {renderContent()}
                </main>

                <footer className={`flex-none pb-6 transition-all duration-500 ${isZenMode ? 'translate-y-full opacity-0 pointer-events-none absolute' : 'translate-y-0 opacity-100'}`}>
                    <QuoteFooter />
                </footer>
            </div>

            {/* Zen Mode Text */}
            {isZenMode && (
                <div className="fixed bottom-8 left-0 w-full text-center pointer-events-none animate-pulse text-zinc-600 text-[10px] tracking-widest uppercase">
                    Double tap to exit Zen
                </div>
            )}
        </div>
    );
};

export default Chronos;