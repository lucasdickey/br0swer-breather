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

export interface BreathingStore extends BreathingState {
  start: () => void;
  stop: () => void;
  updatePhase: (phase: BreathingPhase) => void;
  updateSettings: (settings: Partial<BreathingSettings>) => void;
}

// Add component prop types
export interface BreathingVisualProps {
  phase: BreathingPhase;
  progress: number;
}

export interface BreathingAudioProps {
  phase: BreathingPhase;
}

export interface BreathingVoiceProps {
  phase: BreathingPhase;
  secondsRemaining: number;
}

export interface CompletionCelebrationProps {
  onClose: () => void;
}

export interface Quote {
  text: string;
  author: string;
}
