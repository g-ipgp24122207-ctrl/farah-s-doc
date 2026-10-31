// Web Audio API procedural sound synthesizer and background music manager for fantasy game audio

export const BGM_URL = '/assets/aistudio/Yu-Peng_Chen_-_A_Happy_Day_4594024a.mp3';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private isBgmEnabled: boolean = true;
  private hasUserInteracted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = localStorage.getItem('paimon_quiz_muted');
      this.isMuted = storedMute === 'true';

      const storedBgm = localStorage.getItem('paimon_quiz_bgm_enabled');
      this.isBgmEnabled = storedBgm !== 'false'; // default to enabled

      this.initBgm();
      this.setupGlobalAutoStart();
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private initBgm() {
    if (typeof window === 'undefined') return;
    try {
      this.bgmAudio = new Audio(BGM_URL);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.32;
      this.bgmAudio.preload = 'auto';
    } catch {
      // Audio might not be supported in some environments
    }
  }

  private setupGlobalAutoStart() {
    if (typeof window === 'undefined') return;

    const startOnInteraction = () => {
      this.hasUserInteracted = true;
      this.initCtx();
      if (this.isBgmEnabled && !this.isMuted && this.bgmAudio && this.bgmAudio.paused) {
        this.bgmAudio.play().catch(() => {});
      }
      window.removeEventListener('click', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
      window.removeEventListener('touchstart', startOnInteraction);
    };

    window.addEventListener('click', startOnInteraction, { once: true });
    window.addEventListener('keydown', startOnInteraction, { once: true });
    window.addEventListener('touchstart', startOnInteraction, { once: true });
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('paimon_quiz_muted', String(this.isMuted));
    }
    if (this.isMuted) {
      this.pauseBgm();
    } else if (this.isBgmEnabled) {
      this.playBgm();
    }
    return this.isMuted;
  }

  public getIsBgmEnabled(): boolean {
    return this.isBgmEnabled;
  }

  public isBgmPlaying(): boolean {
    return Boolean(this.bgmAudio && !this.bgmAudio.paused);
  }

  public playBgm() {
    if (this.isMuted || !this.isBgmEnabled) return;
    if (!this.bgmAudio) {
      this.initBgm();
    }
    if (this.bgmAudio) {
      this.bgmAudio.play().catch(() => {
        // Handled silently if autoplay restricted
      });
    }
  }

  public pauseBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  public toggleBgm(): boolean {
    this.isBgmEnabled = !this.isBgmEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('paimon_quiz_bgm_enabled', String(this.isBgmEnabled));
    }

    if (this.isBgmEnabled && !this.isMuted) {
      this.playBgm();
    } else {
      this.pauseBgm();
    }
    return this.isBgmEnabled;
  }

  // Soft fantasy UI button click
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Cheerful correct chime (sparkling fantasy arpeggio)
  public playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.46);
    });
  }

  // Gentle, curious "thinking / try again" sound (friendly and encouraging)
  public playRetry() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(392.00, now); // G4
    osc.frequency.linearRampToValueAtTime(329.63, now + 0.18); // E4

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Victory fanfare for quiz completion
  public playVictory() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const sequence = [
      { freq: 523.25, start: 0, dur: 0.15 }, // C5
      { freq: 659.25, start: 0.15, dur: 0.15 }, // E5
      { freq: 783.99, start: 0.3, dur: 0.18 }, // G5
      { freq: 1046.5, start: 0.48, dur: 0.6 }, // C6
    ];

    sequence.forEach(({ freq, start, dur }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.01, now + start);
      gain.gain.linearRampToValueAtTime(0.25, now + start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + dur);
    });
  }
}

export const sound = new SoundManager();
