class AudioController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private initialized: boolean = false;

  init() {
    if (typeof window === 'undefined') return;
    if (this.initialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.initialized = true;
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.5;
        this.masterGain.connect(this.ctx.destination);
      }
    } catch {
      console.warn("AudioContext not supported");
    }
  }

  private async resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  private async loadSound(url: string): Promise<AudioBuffer | null> {
    if (!this.ctx) return null;
    try {
      const resp = await fetch(url);
      const arrayBuf = await resp.arrayBuffer();
      return await this.ctx.decodeAudioData(arrayBuf);
    } catch {
      return null;
    }
  }

  startAmbience() {
    this.init();
    if (!this.ctx || !this.masterGain || this.ambientOsc) return;

    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const vol = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = 35;

    filter.type = 'lowpass';
    filter.frequency.value = 150;
    filter.Q.value = 1;

    lfo.type = 'sine';
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 80;

    vol.gain.value = 0.15;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc.connect(filter);
    filter.connect(vol);
    vol.connect(this.masterGain);

    osc.start();
    lfo.start();

    this.ambientOsc = osc;
    this.ambientFilter = filter;
    this.ambientGain = vol;
  }

  stopAmbience() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
        this.ambientGain?.disconnect();
      } catch { }
      this.ambientOsc = null;
    }
  }

  playSonar() {
    this.init();
    this.resume();
    const osc = this.ctx?.createOscillator();
    const gain = this.ctx?.createGain();
    if (osc && gain && this.ctx) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    }
  }

  playBubble(timeOffset = 0) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + timeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const freq = 300 + Math.random() * 300;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.linearRampToValueAtTime(freq + 300, t + 0.1);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
    gain.gain.linearRampToValueAtTime(0, t + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  playCrash() {
    this.init();
    const gain = this.ctx?.createGain();
    if (gain && this.ctx) {
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      // noise simulation
      for (let i = 0; i < 5; i++) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100 + Math.random() * 200, this.ctx.currentTime);
        osc.connect(gain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      }
      gain.connect(this.ctx.destination);
    }

    for (let i = 0; i < 5; i++) {
      this.playBubble(i * 0.15 + 0.1);
    }
  }

  playClick() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(400, t);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

export const audioController = new AudioController();