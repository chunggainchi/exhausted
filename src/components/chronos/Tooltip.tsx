"use client";

import React, { useState } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    side?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'bottom' }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <div
                    className={`absolute ${side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} z-50 px-3 py-1.5 
                      text-[11px] font-medium text-white bg-zinc-800 border border-zinc-700/50 
                      rounded-lg shadow-xl backdrop-blur-xl whitespace-nowrap animate-fade-in`}
                    style={{ pointerEvents: 'none' }}
                >
                    {content}
                    {/* Arrow */}
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 border-zinc-700/50 
                        ${side === 'top' ? 'bottom-[-5px] border-b border-r rotate-45' : 'top-[-5px] border-t border-l rotate-45'}`}
                    />
                </div>
            )}
        </div>
    );
};