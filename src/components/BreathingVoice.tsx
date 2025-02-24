import { useEffect, useRef } from "react";
import { BreathingPhase } from "@/types/breathing";
import { useBreathingStore } from "@/store/breathingStore";

interface BreathingVoiceProps {
  phase: BreathingPhase;
  secondsRemaining: number;
}

export function BreathingVoice({
  phase,
  secondsRemaining,
}: BreathingVoiceProps) {
  const settings = useBreathingStore((state) => state.settings);
  const lastSpokenRef = useRef<string>("");

  useEffect(() => {
    if (!settings.enabledMethods.audioVoice || !window.speechSynthesis) return;

    const getMessage = () => {
      // Announce phase changes
      if (secondsRemaining === settings.secondsPerPhase) {
        switch (phase) {
          case "inhale":
            return "Breathe in";
          case "hold-in":
            return "Hold";
          case "exhale":
            return "Breathe out";
          case "hold-out":
            return "Hold";
        }
      }

      // Announce last 3 seconds of each phase
      if (secondsRemaining <= 3) {
        return secondsRemaining.toString();
      }

      return "";
    };

    const message = getMessage();

    // Prevent repeating the same message
    if (message && message !== lastSpokenRef.current) {
      lastSpokenRef.current = message;

      const utterance = new SpeechSynthesisUtterance(message);
      utterance.volume = settings.volume.voice;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  }, [
    phase,
    secondsRemaining,
    settings.enabledMethods.audioVoice,
    settings.volume.voice,
    settings.secondsPerPhase,
  ]);

  return null;
}
