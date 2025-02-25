export type BreathingPhase = 'prepare' | 'inhale' | 'hold' | 'exhale';

export interface BreathingSettings {
  cycleCount: number;
  secondsPerPhase: number;
  volume: {
    voice: number;
    chord: number;
  };
  enabledMethods?: {
    audioChord?: boolean;
    voiceGuide?: boolean;
    visualGuide?: boolean;
  };
}

export interface BreathingState {
  isActive: boolean;
  currentPhase: BreathingPhase;
  currentCycle: number;
  secondsRemaining: number;
  settings: BreathingSettings;
  start: () => void;
  stop: () => void;
  updateTimer: (seconds: number) => void;
  nextPhase: () => void;
  updateSettings: (settings: Partial<BreathingSettings>) => void;
  updatePhase?: (phase: BreathingPhase) => void;
}

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

export type BreathingStore = BreathingState;
