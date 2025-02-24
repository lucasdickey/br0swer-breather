import { useEffect, useState } from "react";
import { useBreathingStore } from "@/store/breathingStore";
import confetti from "canvas-confetti";

interface Quote {
  text: string;
  author: string;
}

// Define as a constant array with explicit type and make it non-empty
const INSPIRATIONAL_QUOTES: [Quote, ...Quote[]] = [
  {
    text: "Breathing is the greatest pleasure in life",
    author: "Giovanni Papini",
  },
  {
    text: "The only way to do great work is to love what you do",
    author: "Steve Jobs",
  },
  {
    text: "Take a deep breath, it's just a bad day, not a bad life",
    author: "Anonymous",
  },
  {
    text: "Breath is the bridge which connects life to consciousness",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Sometimes the most productive thing you can do is relax",
    author: "Mark Black",
  },
  {
    text: "Your breath is your anchor to the present moment",
    author: "Anonymous",
  },
  {
    text: "Breathing in, I calm body and mind. Breathing out, I smile",
    author: "Thich Nhat Hanh",
  },
  {
    text: "The quieter you become, the more you can hear",
    author: "Ram Dass",
  },
  {
    text: "Peace begins with a smile",
    author: "Mother Teresa",
  },
  {
    text: "Within you lies infinite peace waiting to be discovered",
    author: "Anonymous",
  },
  {
    text: "Your calm mind is the ultimate weapon against your challenges",
    author: "Bryant McGill",
  },
  {
    text: "Breath is the finest gift of nature",
    author: "Johannes Herburger",
  },
  {
    text: "Each breath is a gift of life, treasure it",
    author: "Anonymous",
  },
  {
    text: "In the midst of movement and chaos, keep stillness inside of you",
    author: "Deepak Chopra",
  },
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Life is not measured by the breaths we take, but by the moments that take our breath away",
    author: "Maya Angelou",
  },
  {
    text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor",
    author: "Thich Nhat Hanh",
  },
  {
    text: "When you own your breath, nobody can steal your peace",
    author: "Anonymous",
  },
  {
    text: "Breathe in peace, breathe out stress",
    author: "Anonymous",
  },
  {
    text: "The way you breathe is the way you live",
    author: "Anonymous",
  },
] satisfies Quote[];

interface CompletionCelebrationProps {
  onClose: () => void;
}

export function CompletionCelebration({ onClose }: CompletionCelebrationProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    // Fire confetti when component mounts
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#48CAE4", "#2B4570", "#A5D8FF"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Rotate quotes every 5 seconds
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      confetti.reset(); // Clean up confetti
    };
  }, []);

  // TypeScript now knows this array will always have at least one element
  const currentQuote =
    INSPIRATIONAL_QUOTES[currentQuoteIndex % INSPIRATIONAL_QUOTES.length];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-breathing-dark/80 dark:bg-breathing-dark/95 z-50">
      <div
        className="relative max-w-md w-full mx-4 p-8 bg-white dark:bg-breathing-dark/50 
                   rounded-2xl shadow-2xl animate-celebration"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-breathing-accent rounded-full animate-ping opacity-75" />
            <div className="relative bg-breathing-primary dark:bg-breathing-accent rounded-full p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-breathing-primary dark:text-breathing-accent mb-6">
            Great job!
          </h2>

          <div
            data-testid="quote-container"
            className="min-h-[120px] flex flex-col items-center justify-center"
          >
            <p className="text-lg text-breathing-dark dark:text-breathing-neutral mb-4 animate-fadeIn">
              "{currentQuote.text}"
            </p>
            <p className="text-sm text-breathing-primary dark:text-breathing-secondary italic animate-fadeIn">
              - {currentQuote.author}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-8 px-6 py-2 bg-breathing-primary dark:bg-breathing-accent
                     text-white dark:text-breathing-dark rounded-full
                     hover:bg-breathing-accent dark:hover:bg-breathing-secondary
                     transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
