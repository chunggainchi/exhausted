export class SoundEngine {
    private ctx: AudioContext | null = null;
    private enabled: boolean = true;

    constructor() {
        // Init on first interaction
    }

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
        if (!this.ctx || !this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playPop() {
        this.playTone(600, 'sine', 0.1, 0.1);
    }

    playSelect() {
        this.playTone(400, 'sine', 0.1, 0.05);
    }

    playSuccess() {
        this.init();
        // Happy major chord arpeggio
        setTimeout(() => this.playTone(523.25, 'sine', 0.3, 0.1), 0); // C5
        setTimeout(() => this.playTone(659.25, 'sine', 0.3, 0.1), 100); // E5
        setTimeout(() => this.playTone(783.99, 'sine', 0.4, 0.1), 200); // G5
    }

    playError() {
        this.init();
        // Low dissonant sound
        this.playTone(150, 'sawtooth', 0.3, 0.1);
        setTimeout(() => this.playTone(140, 'sawtooth', 0.3, 0.1), 100);
    }

    playWin() {
        this.init();
        // Fanfare
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'square', 0.4, 0.1), i * 150);
        });
        // Final chord
        setTimeout(() => {
            notes.forEach(f => this.playTone(f, 'sine', 1.0, 0.05));
        }, 600);
    }
}

export const soundEngine = new SoundEngine();
