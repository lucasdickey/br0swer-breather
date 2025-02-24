export type BreathingPhase = "inhale" | "hold-in" | "exhale" | "hold-out";

export interface BreathingSettings {
  cycleCount: number;
  secondsPerPhase: number;
  enabledMethods: {
    visual: boolean;
    text: boolean;
    audioChord: boolean;
    audioVoice: boolean;
    haptic: boolean;
  };
  volume: {
    chord: number;
    voice: number;
  };
}

export interface BreathingState {
  isActive: boolean;
  currentPhase: BreathingPhase;
  currentCycle: number;
  secondsRemaining: number;
  settings: BreathingSettings;
}
