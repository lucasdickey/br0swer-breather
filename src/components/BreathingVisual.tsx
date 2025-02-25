import { useEffect, useRef } from 'react';
import { BreathingVisualProps } from '@/types/breathing.ts';

export function BreathingVisual({ phase, progress }: BreathingVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 10;

    // Calculate current radius based on phase and progress
    let radius = maxRadius;

    switch (phase) {
      case 'prepare':
        radius = maxRadius * 0.5;
        break;
      case 'inhale':
        radius = maxRadius * (0.5 + progress * 0.5);
        break;
      case 'hold':
        radius = maxRadius;
        break;
      case 'exhale':
        radius = maxRadius * (1 - progress * 0.5);
        break;
    }

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    // Draw outline
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [phase, progress]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="w-full h-full"
    />
  );
}
