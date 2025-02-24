import { BreathingPhase, BreathingVisualProps } from "@/types/breathing";

export function BreathingVisual({ phase, progress }: BreathingVisualProps) {
  const baseSize = 50; // Smaller base size
  const expandedSize = 100; // Larger expanded size

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

  const size = getSize();

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
        data-testid="breathing-visual"
        className={`rounded-lg transition-transform duration-1000
          bg-gradient-to-br from-breathing-primary to-breathing-accent
          dark:from-breathing-accent dark:to-breathing-primary
          shadow-lg dark:shadow-breathing-accent/20 ${getAnimation()}`}
        style={{
          width: `${size}%`,
          height: `${size}%`,
          transition: "all 0.2s ease-in-out",
        }}
      />
    </div>
  );
}
