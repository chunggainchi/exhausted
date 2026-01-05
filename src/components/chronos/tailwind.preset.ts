import type { Config } from 'tailwindcss';

const chronosPreset: Config = {
    content: [],
    theme: {
        extend: {
            animation: {
                'breath': 'breath 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                'pulse-fast': 'pulse-strong 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                breath: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.1)' },
                },
                'pulse-strong': {
                    '0%, 100%': { opacity: '0.1', transform: 'scale(1.2)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.6)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            }
        },
    },
    plugins: [],
};

export default chronosPreset;