import { useEffect, useRef } from "react";
import {
  BreathingAudioProps,
  BreathingState,
  BreathingPhase,
} from "@/types/breathing";
import { useBreathingStore } from "@/store/breathingStore";

export function BreathingAudio({ phase }: BreathingAudioProps) {
  const audioContextRef = useRef<AudioContext>();
  const oscillators = useRef<OscillatorNode[]>([]);
  const { settings, isActive } = useBreathingStore();

  useEffect(() => {
    // Only create AudioContext after user interaction
    const handleInteraction = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
    };

    document.addEventListener("click", handleInteraction);
    return () => document.removeEventListener("click", handleInteraction);
  }, []);

  useEffect(() => {
    // Stop all oscillators if not active
    if (!isActive) {
      oscillators.current.forEach((osc) => {
        osc.stop();
        osc.disconnect();
      });
      oscillators.current = [];
      return;
    }

    if (!settings.enabledMethods.audioChord || !audioContextRef.current) return;

    // Define chord frequencies for each phase
    const chords: Record<BreathingPhase, number[]> = {
      prepare: [261.63, 329.63, 392.0], // C4, E4, G4 (C major - calming preparation)
      inhale: [392.0, 493.88, 587.33], // G4, B4, D5 (G major)
      "hold-in": [440.0, 554.37, 659.25], // A4, C#5, E5 (A major)
      exhale: [349.23, 440.0, 523.25], // F4, A4, C5 (F major)
      "hold-out": [329.63, 415.3, 493.88], // E4, G#4, B4 (E major)
    };

    // Clean up previous oscillators
    oscillators.current.forEach((osc) => {
      osc.stop();
      osc.disconnect();
    });
    oscillators.current = [];

    // Create new oscillators for each note in the chord
    const masterGain = audioContextRef.current.createGain();
    masterGain.gain.value = settings.volume.chord * 0.2; // Reduced overall volume
    masterGain.connect(audioContextRef.current.destination);

    chords[phase].forEach((frequency, i) => {
      const oscillator = audioContextRef.current!.createOscillator();
      const gainNode = audioContextRef.current!.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      // Slightly different volume for each note
      gainNode.gain.value = 1 - i * 0.2;

      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      oscillator.start();

      oscillators.current.push(oscillator);
    });

    return () => {
      oscillators.current.forEach((osc) => {
        osc.stop();
        osc.disconnect();
      });
      oscillators.current = [];
    };
  }, [
    phase,
    settings.enabledMethods.audioChord,
    settings.volume.chord,
    isActive,
  ]);

  return null;
}
