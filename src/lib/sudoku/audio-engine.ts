export class SoundEngine {
    private ctx: AudioContext | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    private init() {
        if (!this.ctx) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    private playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0) {
        if (!this.ctx) this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    playPop() {
        this.playTone(600, 'sine', 0.1);
    }

    playDing() {
        this.playTone(800, 'sine', 0.3);
        this.playTone(1200, 'sine', 0.3, 0.1);
    }

    playError() {
        this.playTone(150, 'sawtooth', 0.2);
    }

    playFanfare() {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
        notes.forEach((freq, i) => {
            this.playTone(freq, 'square', 0.2, i * 0.1);
        });
        this.playTone(1046.50, 'square', 0.6, 0.4);
    }
}

export const soundEngine = new SoundEngine();
