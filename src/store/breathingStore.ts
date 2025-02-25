import { create } from 'zustand';
import { BreathingPhase, BreathingState } from '@/types/breathing.ts';

// Create the store
export const useBreathingStore = create<BreathingState>(set => ({
  isActive: false,
  currentPhase: 'prepare',
  currentCycle: 1,
  secondsRemaining: 3, // Start with prepare phase
  settings: {
    cycleCount: 4,
    secondsPerPhase: 4,
    volume: {
      voice: 0.7,
      chord: 0.5,
    },
    enabledMethods: {
      audioChord: true,
      voiceGuide: true,
      visualGuide: true,
    },
  },

  start: () =>
    set({
      isActive: true,
      currentPhase: 'prepare',
      currentCycle: 1,
      secondsRemaining: 3,
    }),

  stop: () =>
    set({
      isActive: false,
    }),

  updateTimer: seconds =>
    set({
      secondsRemaining: seconds,
    }),

  nextPhase: () =>
    set(state => {
      const phases: BreathingPhase[] = ['prepare', 'inhale', 'hold', 'exhale'];
      const currentIndex = phases.indexOf(state.currentPhase);
      const nextIndex = (currentIndex + 1) % phases.length;
      const nextPhase = phases[nextIndex];

      // If we're going back to prepare, increment the cycle
      const newCycle =
        nextPhase === 'prepare' ? state.currentCycle + 1 : state.currentCycle;

      // Set the seconds for the next phase
      const seconds =
        nextPhase === 'prepare' ? 3 : state.settings.secondsPerPhase;

      return {
        currentPhase: nextPhase,
        currentCycle: newCycle,
        secondsRemaining: seconds,
      };
    }),

  updateSettings: newSettings =>
    set(state => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),

  updatePhase: phase =>
    set({
      currentPhase: phase,
    }),
}));
