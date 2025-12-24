// Speech Utility
// Handles TTS initialization, priming, and speaking

let voiceDE: SpeechSynthesisVoice | null = null;
let voicesReady = false;
let isSpeechPrimed = false;

export async function initializeSpeech(): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error("TTS not supported");
    return;
  }

  const primeSpeechEngine = () => {
    if (isSpeechPrimed) return;
    console.log('Priming speech engine...');
    try {
      // Cancel any pending speech before priming
      window.speechSynthesis.cancel();
      const primingUtterance = new SpeechSynthesisUtterance('');
      primingUtterance.volume = 0;
      // Short timeout to ensure browser processes it
      window.speechSynthesis.speak(primingUtterance);
      isSpeechPrimed = true;
    } catch (e) {
      console.error('Speech engine priming failed:', e);
    }
  };

  // Add listener to capture first user interaction
  const handleInteraction = async () => {
    primeSpeechEngine();
    await loadVoices();
    document.body.removeEventListener('pointerdown', handleInteraction);
    document.body.removeEventListener('keydown', handleInteraction);
  };

  document.body.addEventListener('pointerdown', handleInteraction);
  document.body.addEventListener('keydown', handleInteraction);

  // Try loading immediately in case browser allows it
  loadVoices();
}

async function loadVoices() {
    if (voicesReady) return;

    const get = (): SpeechSynthesisVoice[] => window.speechSynthesis.getVoices();
    
    let voices = get();
    if (!voices.length) {
        // Wait for voices to load
        await new Promise<void>(resolve => {
            const onVoicesChanged = () => {
                window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
                resolve();
            };
            window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
            // Fallback timeout in case event never fires
            setTimeout(resolve, 1000);
        });
        voices = get();
    }

    const deVoices = voices.filter(v => v.lang.startsWith('de'));
    if (deVoices.length > 0) {
        // Prefer Anna or Google Deutsch, otherwise first available
        voiceDE = deVoices.find(v => v.name.includes('Anna')) || 
                  deVoices.find(v => v.localService) || 
                  deVoices[0];
        console.log("Selected German voice:", voiceDE.name);
        voicesReady = true;
    } else {
        console.warn("No German voices found. Using default.");
        // Fallback to any available voice if no German voice found
        voiceDE = voices[0] || null;
    }
}

export function speak(text: string, options: { rate?: number } = {}): Promise<void> {
    return new Promise((resolve) => {
        if (!voiceDE) {
            // Try to load voices one last time if they aren't ready
            loadVoices().then(() => {
                doSpeak(text, options, resolve);
            });
            return;
        }
        doSpeak(text, options, resolve);
    });
}

function doSpeak(text: string, options: { rate?: number }, resolve: () => void) {
    try {
        // Cancel previous speech to prevent queue buildup, this might trigger 'canceled' error on previous utterance
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        if (voiceDE) {
            utterance.voice = voiceDE;
            utterance.lang = voiceDE.lang;
        }
        utterance.rate = options.rate || 0.85;
        
        utterance.onend = () => {
            resolve();
        };

        utterance.onerror = (e) => {
            // 'interrupted' and 'canceled' are normal when clicking fast
            if (e.error === 'interrupted' || e.error === 'canceled') {
                resolve();
            } else {
                console.error("SpeechSynthesis Error:", e.error);
                resolve(); // Resolve anyway to not break app flow
            }
        };

        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.error("Speech synthesis exception:", e);
        resolve();
    }
}

export const speakDe = async (t: string, opts = {}) => await speak(t, { ...opts });

export const speakChunk = async (chunk: string) => {
    if (!chunk) return;
    const lc = chunk.toLowerCase();
    const isSingle = chunk.length === 1;

    // Phonetic mapping for letters
    const V_LONG: Record<string, string> = { a:'ah', e:'eh', i:'ih', o:'oh', u:'uh', ä:'äh', ö:'öh', ü:'üh' };
    const C_LONG: Record<string, string> = { m:'m', n:'n', s:'s', l:'l', f:'f', r:'r', z:'z', h:'h' };
    
    const textToSpeak = isSingle ? (V_LONG[lc] || C_LONG[lc] || lc) : lc;
    await speak(textToSpeak, { rate: 0.75 });
};