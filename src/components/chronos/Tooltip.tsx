"use client";

import React, { useState } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    side?: 'top' | 'bottom';
    align?: 'left' | 'center' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'bottom', align = 'center' }) => {
    const [isVisible, setIsVisible] = useState(false);

    let alignmentClass = 'left-1/2 -translate-x-1/2';
    if (align === 'left') alignmentClass = 'left-0';
    if (align === 'right') alignmentClass = 'right-0';

    let arrowAlignmentClass = 'left-1/2 -translate-x-1/2';
    if (align === 'left') arrowAlignmentClass = 'left-4';
    if (align === 'right') arrowAlignmentClass = 'right-4';

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
                    className={`absolute ${side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} ${alignmentClass} z-50 px-3 py-2 
                      text-[11px] font-medium text-white bg-zinc-800 border border-zinc-700/50 
                      rounded-lg shadow-xl backdrop-blur-xl animate-fade-in w-max max-w-[250px] whitespace-normal leading-relaxed`}
                    style={{ pointerEvents: 'none' }}
                >
                    {content}
                    {/* Arrow */}
                    <div
                        className={`absolute ${arrowAlignmentClass} w-2 h-2 bg-zinc-800 border-zinc-700/50 
                        ${side === 'top' ? 'bottom-[-5px] border-b border-r rotate-45' : 'top-[-5px] border-t border-l rotate-45'}`}
                    />
                </div>
            )}
        </div>
    );
};