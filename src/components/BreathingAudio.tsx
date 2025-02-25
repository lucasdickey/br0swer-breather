import { useEffect, useRef } from 'react';
import { BreathingAudioProps } from '@/types/breathing';
import { useBreathingStore } from '@/store/breathingStore.ts';

export function BreathingAudio({ phase }: BreathingAudioProps) {
  const settings = useBreathingStore(state => state.settings);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();

      // Create gain node
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = 0;
      gainNode.connect(audioContextRef.current.destination);
      gainNodeRef.current = gainNode;
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  // Play different tones based on the breathing phase
  useEffect(() => {
    if (!settings.enabledMethods?.audioChord || !audioContextRef.current)
      return;

    // Stop previous oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    // Create new oscillator
    const oscillator = audioContextRef.current.createOscillator();

    // Set frequency based on phase
    switch (phase) {
      case 'prepare':
        oscillator.frequency.value = 196.0; // G3
        break;
      case 'inhale':
        oscillator.frequency.value = 261.63; // C4
        break;
      case 'hold':
        oscillator.frequency.value = 329.63; // E4
        break;
      case 'exhale':
        oscillator.frequency.value = 196.0; // G3
        break;
    }

    // Connect to gain node and start
    oscillator.connect(gainNodeRef.current!);
    oscillator.start();
    oscillatorRef.current = oscillator;

    // Set volume
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = settings.volume.chord;
    }
  }, [phase, settings.volume.chord, settings.enabledMethods?.audioChord]);

  return null;
}
