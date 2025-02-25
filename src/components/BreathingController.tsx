import { useEffect, useRef } from 'react';
import { useBreathingStore } from '@/store/breathingStore.ts';
import { BreathingVisual } from '@/components/BreathingVisual.tsx';
import { BreathingAudio } from '@/components/BreathingAudio.tsx';
import { BreathingVoice } from '@/components/BreathingVoice.tsx';
import { DarkModeToggle } from '@/components/DarkModeToggle.tsx';
import { CompletionCelebration } from '@/components/CompletionCelebration.tsx';

export function BreathingController() {
  const {
    isActive,
    currentPhase,
    currentCycle,
    secondsRemaining,
    settings,
    start,
    stop,
    updateTimer,
    nextPhase,
    updateSettings,
  } = useBreathingStore();

  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      const newSecondsRemaining = secondsRemaining - 1;

      if (newSecondsRemaining <= 0) {
        nextPhase();
      } else {
        updateTimer(newSecondsRemaining);
      }

      if (currentCycle > settings.cycleCount) {
        stop();
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    isActive,
    secondsRemaining,
    currentCycle,
    settings.cycleCount,
    stop,
    updateTimer,
    nextPhase,
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <DarkModeToggle />
      <div className="h-screen flex flex-col items-center justify-center relative">
        {/* Left Volume Control */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <div className="transform -rotate-90 translate-y-24 origin-left-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-white/60">Voice</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={settings.volume.voice}
                onChange={e =>
                  updateSettings({
                    volume: {
                      ...settings.volume,
                      voice: Number(e.target.value),
                    },
                  })
                }
                className="w-48 accent-white opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-8">
          {!isActive ? (
            // Cycle Count Selector
            <div className="flex flex-col items-center gap-4">
              <div className="text-xl text-white/60">Number of Cycles</div>
              <div className="flex gap-4">
                {[4, 6, 8, 10].map(count => (
                  <button
                    key={count}
                    onClick={() => updateSettings({ cycleCount: count })}
                    className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${
                        settings.cycleCount === count
                          ? 'bg-white/20 text-white'
                          : 'text-white/60 hover:text-white'
                      }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Timer and Phase Display
            <>
              <div className="text-4xl font-light">
                00:{secondsRemaining.toString().padStart(2, '0')}
              </div>

              <div className="relative w-64 h-64">
                <BreathingVisual
                  phase={currentPhase}
                  progress={1 - secondsRemaining / settings.secondsPerPhase}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-light">{currentCycle}</div>
                </div>
              </div>

              <div className="text-xl text-white/60 lowercase">
                {currentPhase === 'prepare'
                  ? `get ready (${secondsRemaining})`
                  : currentPhase.replace('-', ' ')}
              </div>
            </>
          )}
        </div>

        {/* Right Volume Control */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="transform -rotate-90 -translate-y-24 origin-right-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-white/60">Tone</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={settings.volume.chord}
                onChange={e =>
                  updateSettings({
                    volume: {
                      ...settings.volume,
                      chord: Number(e.target.value),
                    },
                  })
                }
                className="w-48 accent-white opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Start Button */}
        {isActive ? (
          <button
            onClick={stop}
            className="absolute bottom-8 text-xl text-white/60 hover:text-white transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={start}
            className="absolute bottom-8 text-xl text-white/60 hover:text-white transition-colors"
          >
            Start
          </button>
        )}

        {/* Add CompletionCelebration when cycle is complete */}
        {currentCycle > settings.cycleCount && (
          <CompletionCelebration onClose={() => stop()} />
        )}

        {/* Hidden Audio Components */}
        <div className="hidden">
          <BreathingAudio phase={currentPhase} />
          <BreathingVoice
            phase={currentPhase}
            secondsRemaining={secondsRemaining}
          />
        </div>
      </div>
    </div>
  );
}
