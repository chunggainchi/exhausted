"use client";
class AudioService {
  private ctx: AudioContext | null = null;
  private servoOsc: OscillatorNode | null = null;
  private servoGain: GainNode | null = null;

  constructor() {
    // Lazy init
  }

  private init() {
  // SSR safety (even though this is a client file, it’s a good guard)
  if (typeof window === "undefined") return;

  if (!this.ctx) {
    // Properly type webkitAudioContext without using `any`
    const w = window as Window &
      typeof globalThis & {
        webkitAudioContext?: typeof AudioContext;
      };

    const AudioCtx = window.AudioContext ?? w.webkitAudioContext;

    if (!AudioCtx) return; // very old browsers
    this.ctx = new AudioCtx();
  }

  if (this.ctx.state === "suspended") {
    // resume() returns a Promise; ignore rejection safely
    this.ctx.resume().catch(() => {});
  }
}


  public playServo(active: boolean) {
    this.init();
    if (!this.ctx) return;

    if (active) {
      if (!this.servoOsc) {
        this.servoOsc = this.ctx.createOscillator();
        this.servoGain = this.ctx.createGain();
        
        this.servoOsc.type = 'sawtooth';
        this.servoOsc.frequency.setValueAtTime(100, this.ctx.currentTime);
        
        // Low pass filter to make it sound like a motor
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;

        this.servoOsc.connect(filter);
        filter.connect(this.servoGain);
        this.servoGain.connect(this.ctx.destination);
        
        this.servoGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.servoGain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);
        
        this.servoOsc.start();
        
        // Slight pitch modulation
        this.servoOsc.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 1);
      }
    } else {
      if (this.servoOsc && this.servoGain) {
        this.servoGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
        const osc = this.servoOsc;
        setTimeout(() => {
            try {
               osc.stop(); 
               osc.disconnect();
             } catch {
    // ignore
  }
        }, 200);
        this.servoOsc = null;
        this.servoGain = null;
      }
    }
  }

  public playPneumaticHiss() {
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.5; // 0.5 sec
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  public playClunk() {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.1);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  public speak(text: string) {
    if (!('speechSynthesis' in window)) return;
    // Simple cancel to prevent pile-up if spamming, though standard behavior is queuing.
    window.speechSynthesis.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Speaks a sequence of letters followed by the word formed so far.
   * Example: ["B", "A"], "BA" -> "B. A. BA."
   */
  public speakSpelling(letters: string[], word: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Use periods to force pauses between letters in most TTS engines
    const sequence = letters.join('. '); 
    const text = `${sequence}. ${word}.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.8; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  }
}

export const audioService = new AudioService();