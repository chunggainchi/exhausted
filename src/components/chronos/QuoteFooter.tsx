import React from 'react';
import { Rocket } from 'lucide-react';

export const QuoteFooter: React.FC = () => {
    return (
        <div className="mt-2 md:mt-4 w-full flex flex-col items-center justify-end h-full">
            <a
                href="https://exhaustedrocket.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors duration-300 py-2 px-4 rounded-full hover:bg-zinc-900/50"
            >
                <span className="text-[10px] md:text-xs tracking-widest font-thin font-sans">product of exhaustedrocket.com</span>
                <Rocket size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300 text-orange-500" />
            </a>
        </div>
    );
};