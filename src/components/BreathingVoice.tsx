import { useEffect, useRef } from 'react';
import { BreathingVoiceProps } from '@/types/breathing.ts';
import { useBreathingStore } from '@/store/breathingStore.ts';

export function BreathingVoice({
  phase,
  secondsRemaining,
}: BreathingVoiceProps) {
  const settings = useBreathingStore(state => state.settings);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedRef = useRef<string | null>(null);

  useEffect(() => {
    // Skip if voice is disabled or volume is 0
    if (!settings.enabledMethods?.voiceGuide || settings.volume.voice === 0) {
      return;
    }

    // Play voice guidance based on phase and timing
    let audioSrc = '';
    let shouldPlay = false;

    if (phase === 'prepare' && secondsRemaining === 3) {
      audioSrc = '/audio/get-ready.mp3';
      shouldPlay = true;
    } else if (
      phase === 'inhale' &&
      secondsRemaining === settings.secondsPerPhase
    ) {
      audioSrc = '/audio/inhale.mp3';
      shouldPlay = true;
    } else if (
      phase === 'hold' &&
      secondsRemaining === settings.secondsPerPhase
    ) {
      audioSrc = '/audio/hold.mp3';
      shouldPlay = true;
    } else if (
      phase === 'exhale' &&
      secondsRemaining === settings.secondsPerPhase
    ) {
      audioSrc = '/audio/exhale.mp3';
      shouldPlay = true;
    }

    // Play the audio if needed
    if (
      shouldPlay &&
      audioSrc &&
      lastPlayedRef.current !== `${phase}-${secondsRemaining}`
    ) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc);
      } else {
        audioRef.current.src = audioSrc;
      }

      audioRef.current.volume = settings.volume.voice;
      audioRef.current
        .play()
        .catch(err => console.error('Error playing audio:', err));
      lastPlayedRef.current = `${phase}-${secondsRemaining}`;
    }
  }, [
    phase,
    secondsRemaining,
    settings.secondsPerPhase,
    settings.volume.voice,
    settings.enabledMethods?.voiceGuide,
  ]);

  return null;
}
