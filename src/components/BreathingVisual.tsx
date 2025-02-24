import { BreathingPhase, BreathingVisualProps } from "@/types/breathing";

export function BreathingVisual({ phase, progress }: BreathingVisualProps) {
  const baseSize = 80;
  const expandedSize = 100;

  const getSize = () => {
    switch (phase) {
      case "prepare":
        return baseSize;
      case "inhale":
        return baseSize + (expandedSize - baseSize) * progress;
      case "hold-in":
        return expandedSize;
      case "exhale":
        return expandedSize - (expandedSize - baseSize) * progress;
      case "hold-out":
        return baseSize;
      default:
        return baseSize;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="rounded-full bg-white/10 transition-all duration-300"
        style={{
          width: `${getSize()}%`,
          height: `${getSize()}%`,
        }}
      />
      <div
        className="absolute inset-0 border border-white/20 rounded-full"
        style={{
          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
        }}
      />
    </div>
  );
}
