/**
 * Realistic Acoustic Paper & Page Turn Sound Engine
 * Synthesizes organic, ASMR-quality physical paper flipping, leafing,
 * and tactile parchment sounds using the Web Audio API without synthetic beeps.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private pageTurnBuffers: AudioBuffer[] = [];
  private rustleBuffer: AudioBuffer | null = null;
  private tapBuffer: AudioBuffer | null = null;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('satyajit_sound_enabled');
      this.enabled = saved !== null ? saved === 'true' : true;
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('satyajit_sound_enabled', String(val));
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled);
    if (this.enabled) {
      this.playPageTurn();
    }
    return this.enabled;
  }

  private initCtx() {
    if (typeof window === 'undefined') return;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Handled on subsequent user interaction
      });
    }

    if (this.ctx && !this.isInitialized) {
      this.prebakeAcousticBuffers();
      this.isInitialized = true;
    }
  }

  /**
   * Pre-generate organic textured noise buffers with Kellet pink-noise filtering
   * for realistic acoustic friction and zero-latency playback.
   */
  private prebakeAcousticBuffers() {
    if (!this.ctx) return;
    const sampleRate = this.ctx.sampleRate;

    // Helper: generate pink/brown noise array with physical fiber texture
    const generateParchmentNoise = (duration: number): Float32Array => {
      const samples = Math.floor(sampleRate * duration);
      const data = new Float32Array(samples);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < samples; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;

        // Micro fiber irregularity: subtle non-linear grain
        const grain = 1.0 + 0.15 * Math.sin(i * 0.012) * Math.cos(i * 0.007);
        data[i] = pink * 0.14 * grain;
      }
      return data;
    };

    // 1. Generate 3 distinct page turn variations (260ms - 320ms)
    const durations = [0.28, 0.31, 0.26];
    this.pageTurnBuffers = durations.map(dur => {
      const samples = Math.floor(sampleRate * dur);
      const buffer = this.ctx!.createBuffer(1, samples, sampleRate);
      const channel = buffer.getChannelData(0);
      const noise = generateParchmentNoise(dur);

      for (let i = 0; i < samples; i++) {
        const t = i / samples;
        let envelope = 0;

        // Multi-phase physical page flip envelope:
        // [0.0 - 0.15]: Initial lift / finger friction
        // [0.15 - 0.55]: The arching paper whoosh
        // [0.55 - 0.70]: The landing slap / impact
        // [0.70 - 1.0]: Settling flutter decay
        if (t < 0.15) {
          envelope = (t / 0.15) * 0.6;
        } else if (t < 0.55) {
          const sweepT = (t - 0.15) / 0.40;
          envelope = 0.6 + 0.4 * Math.sin(sweepT * Math.PI);
        } else if (t < 0.70) {
          // Landing slap transient peak
          const slapT = (t - 0.55) / 0.15;
          envelope = 1.0 - slapT * 0.45;
        } else {
          // Micro flutter trailing off
          const trailT = (t - 0.70) / 0.30;
          const flutter = 1.0 + 0.25 * Math.sin(trailT * 40);
          envelope = Math.max(0, 0.55 * Math.exp(-trailT * 4.5) * flutter);
        }

        channel[i] = noise[i] * envelope;
      }

      return buffer;
    });

    // 2. Prebake soft paper rustle buffer (180ms)
    const rustleDur = 0.18;
    const rustleSamples = Math.floor(sampleRate * rustleDur);
    this.rustleBuffer = this.ctx.createBuffer(1, rustleSamples, sampleRate);
    const rustleChannel = this.rustleBuffer.getChannelData(0);
    const rustleNoise = generateParchmentNoise(rustleDur);
    for (let i = 0; i < rustleSamples; i++) {
      const t = i / rustleSamples;
      const env = Math.sin(t * Math.PI) * Math.exp(-t * 2.5);
      rustleChannel[i] = rustleNoise[i] * env * 0.9;
    }

    // 3. Prebake tactile paper tap buffer (55ms) - for button clicks
    const tapDur = 0.055;
    const tapSamples = Math.floor(sampleRate * tapDur);
    this.tapBuffer = this.ctx.createBuffer(1, tapSamples, sampleRate);
    const tapChannel = this.tapBuffer.getChannelData(0);
    const tapNoise = generateParchmentNoise(tapDur);
    for (let i = 0; i < tapSamples; i++) {
      const t = i / tapSamples;
      const env = Math.exp(-t * 35.0);
      tapChannel[i] = tapNoise[i] * env;
    }
  }

  /**
   * Realistic Physical Page Turn Sound:
   * Layer 1: Sweeping bandpass filter (whoosh of paper sliding through air)
   * Layer 2: Low-frequency air displacement (weight/mass of heavy book paper)
   * Layer 3: Crisp paper landing slap (edge settling against the page stack)
   */
  public playPageTurn(reverse: boolean = false) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const sampleRate = this.ctx.sampleRate;

      // Ensure buffers exist
      if (this.pageTurnBuffers.length === 0) {
        this.prebakeAcousticBuffers();
      }

      // Pick a random variation so successive page turns sound distinct and organic
      const bufferIndex = Math.floor(Math.random() * (this.pageTurnBuffers.length || 1));
      const sourceBuffer = this.pageTurnBuffers[bufferIndex];
      if (!sourceBuffer) return;

      // Subtle organic randomization in pitch and speed (±6%)
      const rateVariation = 0.94 + Math.random() * 0.12;

      // =========================================================================
      // LAYER 1: Air Sweep & Paper Surface Friction (Bandpass Filter Sweep)
      // =========================================================================
      const sweepSource = this.ctx.createBufferSource();
      sweepSource.buffer = sourceBuffer;
      sweepSource.playbackRate.setValueAtTime(rateVariation, now);

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.Q.setValueAtTime(2.2, now);

      // Sweep frequencies mimic the physical arc of the turning leaf
      const startFreq = reverse ? 1400 : 3400;
      const midFreq = reverse ? 3200 : 2100;
      const endFreq = reverse ? 2600 : 850;

      bandpass.frequency.setValueAtTime(startFreq, now);
      bandpass.frequency.exponentialRampToValueAtTime(midFreq, now + 0.10);
      bandpass.frequency.exponentialRampToValueAtTime(endFreq, now + 0.26);

      const sweepGain = this.ctx.createGain();
      sweepGain.gain.setValueAtTime(0.001, now);
      sweepGain.gain.linearRampToValueAtTime(0.24, now + 0.04);
      sweepGain.gain.linearRampToValueAtTime(0.32, now + 0.14);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.29);

      sweepSource.connect(bandpass);
      bandpass.connect(sweepGain);
      sweepGain.connect(this.ctx.destination);

      // =========================================================================
      // LAYER 2: Heavy Parchment Mass & Low Air Resonance
      // =========================================================================
      const lowSource = this.ctx.createBufferSource();
      lowSource.buffer = sourceBuffer;
      lowSource.playbackRate.setValueAtTime(rateVariation * 0.85, now);

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(220, now);
      lowpass.Q.setValueAtTime(1.8, now);

      const lowGain = this.ctx.createGain();
      lowGain.gain.setValueAtTime(0.001, now);
      lowGain.gain.linearRampToValueAtTime(0.18, now + 0.07);
      lowGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      lowSource.connect(lowpass);
      lowpass.connect(lowGain);
      lowGain.connect(this.ctx.destination);

      // =========================================================================
      // LAYER 3: Crisp Paper Landing Slap / Edge Flutter
      // =========================================================================
      const slapTime = now + 0.14;
      const slapSource = this.ctx.createBufferSource();
      slapSource.buffer = sourceBuffer;
      slapSource.playbackRate.setValueAtTime(1.15, slapTime);

      const slapFilter = this.ctx.createBiquadFilter();
      slapFilter.type = 'highpass';
      slapFilter.frequency.setValueAtTime(2200, slapTime);

      const slapGain = this.ctx.createGain();
      slapGain.gain.setValueAtTime(0.001, slapTime);
      slapGain.gain.linearRampToValueAtTime(0.26, slapTime + 0.015);
      slapGain.gain.exponentialRampToValueAtTime(0.001, slapTime + 0.11);

      slapSource.connect(slapFilter);
      slapFilter.connect(slapGain);
      slapGain.connect(this.ctx.destination);

      // Trigger layers in synchronization
      sweepSource.start(now);
      sweepSource.stop(now + 0.32);

      lowSource.start(now);
      lowSource.stop(now + 0.25);

      slapSource.start(slapTime);
      slapSource.stop(slapTime + 0.14);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Soft paper rustle / leafing through notebook edges
   */
  public playPaperRustle() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      if (!this.rustleBuffer) {
        this.prebakeAcousticBuffers();
      }
      if (!this.rustleBuffer) return;

      const source = this.ctx.createBufferSource();
      source.buffer = this.rustleBuffer;
      source.playbackRate.setValueAtTime(0.95 + Math.random() * 0.1, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(1.4, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start(now);
      source.stop(now + 0.2);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Tactile Paper Corner Tap:
   * Used for UI buttons, tabs, and switches so clicks sound like authentic
   * physical paper handling rather than an artificial electronic beep.
   */
  public playPaperTap() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      if (!this.tapBuffer) {
        this.prebakeAcousticBuffers();
      }
      if (!this.tapBuffer) return;

      const source = this.ctx.createBufferSource();
      source.buffer = this.tapBuffer;
      source.playbackRate.setValueAtTime(0.96 + Math.random() * 0.08, now);

      // Layer 1: High frequency paper snap
      const highpass = this.ctx.createBiquadFilter();
      highpass.type = 'bandpass';
      highpass.frequency.setValueAtTime(2400, now);
      highpass.Q.setValueAtTime(2.0, now);

      const tapGain = this.ctx.createGain();
      tapGain.gain.setValueAtTime(0.16, now);
      tapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      source.connect(highpass);
      highpass.connect(tapGain);
      tapGain.connect(this.ctx.destination);

      source.start(now);
      source.stop(now + 0.06);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Alias for UI clicks - produces the gentle tactile paper tap
   */
  public playClick() {
    this.playPaperTap();
  }

  /**
   * Quick paper card shuffle / index slip sound
   */
  public playCardSelect() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      if (!this.rustleBuffer) {
        this.prebakeAcousticBuffers();
      }
      if (!this.rustleBuffer) return;

      const source = this.ctx.createBufferSource();
      source.buffer = this.rustleBuffer;
      source.playbackRate.setValueAtTime(1.25, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
      filter.Q.setValueAtTime(2.4, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.20, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start(now);
      source.stop(now + 0.15);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Mellow desk bell / bookmark chime
   */
  public playChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Warm, harmonic chime (587.33 Hz D5 + 880 Hz A5) with gentle decay
      [587.33, 880.00].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.04 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 0.50);
      });
    } catch {
      // AudioContext fallback
    }
  }
}

export const sound = new SoundEngine();
