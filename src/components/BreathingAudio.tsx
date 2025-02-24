import { useEffect, useRef } from "react";
import { BreathingPhase } from "@/types/breathing";
import { useBreathingStore } from "@/store/breathingStore";

interface BreathingAudioProps {
  phase: BreathingPhase;
}

export function BreathingAudio({ phase }: BreathingAudioProps) {
  const audioContext = useRef<AudioContext>();
  const oscillator = useRef<OscillatorNode>();
  const settings = useBreathingStore((state) => state.settings);

  useEffect(() => {
    if (!settings.enabledMethods.audioChord) return;

    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    const frequencies: Record<BreathingPhase, number> = {
      inhale: 392.0, // G4
      "hold-in": 440.0, // A4
      exhale: 349.23, // F4
      "hold-out": 329.63, // E4
    };

    oscillator.current?.disconnect();
    oscillator.current = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.current.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.current.frequency.value = frequencies[phase];
    gainNode.gain.value = settings.volume.chord;

    oscillator.current.start();

    return () => {
      oscillator.current?.stop();
      oscillator.current?.disconnect();
    };
  }, [phase, settings.enabledMethods.audioChord, settings.volume.chord]);

  return null;
}
