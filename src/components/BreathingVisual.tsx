import { BreathingPhase } from "@/types/breathing";

interface BreathingVisualProps {
  phase: BreathingPhase;
  progress: number;
}

export function BreathingVisual({ phase, progress }: BreathingVisualProps) {
  const getAnimation = () => {
    switch (phase) {
      case "inhale":
        return "animate-breathe-in";
      case "exhale":
        return "animate-breathe-out";
      case "hold-in":
      case "hold-out":
        return "animate-hold";
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`w-1/2 h-1/2 rounded-lg transition-all duration-1000
          bg-gradient-to-br from-breathing-primary to-breathing-accent
          dark:from-breathing-accent dark:to-breathing-primary
          shadow-lg dark:shadow-breathing-accent/20 ${getAnimation()}`}
        style={{
          transform: `scale(${
            phase === "inhale"
              ? 0.5 + progress * 0.5
              : phase === "exhale"
              ? 1 - progress * 0.5
              : phase === "hold-in"
              ? 1
              : 0.5
          })`,
        }}
      />
    </div>
  );
}
