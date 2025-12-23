// Audio Service to handle TTS and SFX

let voiceHK: SpeechSynthesisVoice | null = null;
let voiceDE: SpeechSynthesisVoice | null = null;
let voiceEN: SpeechSynthesisVoice | null = null;
let voicesReady = false;
let actx: AudioContext | null = null;

function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise(resolve => {
    const tryLoad = () => {
      if (typeof window === 'undefined') return;
      const vs = window.speechSynthesis.getVoices();
      if (vs && vs.length) { resolve(vs); }
      else { setTimeout(tryLoad, 120); }
    };
    if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = tryLoad;
    }
    tryLoad();
  });
}

function pickVoices(voices: SpeechSynthesisVoice[]) {
  const isHK = (v: SpeechSynthesisVoice) => /zh[-_]?HK|yue|hong\s*kong/i.test(v.lang || "") || /Hong\s*Kong|Cantonese|粵/i.test(v.name || "");
  const isTW = (v: SpeechSynthesisVoice) => /zh[-_]?TW/i.test(v.lang || "");
  const isCN = (v: SpeechSynthesisVoice) => /zh[-_]?CN/i.test(v.lang || "");
  voiceHK = voices.find(isHK) || voices.find(isTW) || voices.find(isCN) || null;

  const deVoices = voices.filter(v => /^de([-_]|$)/i.test(v.lang || "") || /Deutsch|German/i.test(v.name || ""));
  const deLocal = deVoices.filter(v => v.localService && !/online|cloud|natural/i.test((v.name || "")));
  voiceDE = deLocal[0] || deVoices[0] || null;

  const enVoices = voices.filter(v => /^en([-_]|$)/i.test(v.lang || "") || /English/i.test(v.name || ""));
  const enLocal = enVoices.filter(v => v.localService && !/online|cloud|natural/i.test((v.name || "")));
  voiceEN = enLocal[0] || enVoices[0] || null;

  voicesReady = true;
}

export async function initAudio() {
  if (voicesReady) return;
  const voices = await waitForVoices();
  pickVoices(voices);
}

export function speak(text: string, lang: 'yue' | 'de' | 'en') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  if (!voicesReady) {
    // Attempt init if not ready
    initAudio().then(() => speak(text, lang));
    return;
  }
  
  try {
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    
    const u = new SpeechSynthesisUtterance(text);
    if (lang === 'yue') {
      if (voiceHK) u.voice = voiceHK;
      u.lang = (voiceHK && voiceHK.lang) || 'zh-HK';
    } else if (lang === 'de') {
      if (voiceDE) u.voice = voiceDE;
      u.lang = (voiceDE && voiceDE.lang) || 'de-DE';
      u.rate = 0.95;
    } else {
      if (voiceEN) u.voice = voiceEN;
      u.lang = (voiceEN && voiceEN.lang) || 'en-US';
      u.rate = 0.98;
    }
    
    window.speechSynthesis.speak(u);
  } catch {
    // ignore errors
  }
}

interface IWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

function ensureAC() {
  if (!actx && typeof window !== 'undefined') {
    try {
      const win = window as unknown as IWindow;
      const AudioContextClass = window.AudioContext || win.webkitAudioContext;
      if (AudioContextClass) {
        actx = new AudioContextClass();
      }
    } catch {
      // ignore
    }
  }
}

function tone(freq: number, dur = 0.15, type: OscillatorType = 'sine', gain = 0.05) {
  ensureAC();
  if (!actx) return;
  const t = actx.currentTime;
  const o = actx.createOscillator();
  const g = actx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g);
  g.connect(actx.destination);
  o.start(t);
  o.stop(t + dur);
}

export function fxPositive() {
  [523, 659, 784].forEach((f, i) => setTimeout(() => tone(f, 0.12, 'triangle', 0.06), i * 120));
}

export function fxNegative() {
  tone(220, 0.18, 'sawtooth', 0.05);
  setTimeout(() => tone(196, 0.2, 'sawtooth', 0.04), 140);
}