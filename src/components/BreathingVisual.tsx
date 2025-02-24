import { BreathingPhase } from "@/types/breathing";

interface BreathingVisualProps {
  phase: BreathingPhase;
  progress: number;
}

export function BreathingVisual({ phase, progress }: BreathingVisualProps) {
  const getTransform = () => {
    switch (phase) {
      case "inhale":
        return `scale(${0.5 + progress * 0.5})`;
      case "hold-in":
        return "scale(1)";
      case "exhale":
        return `scale(${1 - progress * 0.5})`;
      case "hold-out":
        return "scale(0.5)";
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-1/2 h-1/2 bg-breathing-accent rounded-lg transition-transform duration-1000"
        style={{ transform: getTransform() }}
      />
    </div>
  );
}
