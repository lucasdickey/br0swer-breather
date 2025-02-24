import { useBreathingStore } from "@/store/breathingStore";

export function BreathingSettings() {
  const { settings, updateSettings } = useBreathingStore();

  return (
    <div
      className="w-full max-w-md p-6 bg-white dark:bg-breathing-dark/50 rounded-lg shadow-lg
                    transition-colors duration-300"
    >
      <h2 className="text-xl font-semibold text-breathing-dark dark:text-breathing-neutral mb-4">
        Settings
      </h2>

      <div className="space-y-4">
        {/* Cycle Count */}
        <div>
          <label className="block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-1">
            Number of Cycles
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={settings.cycleCount}
            onChange={(e) =>
              updateSettings({ cycleCount: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-breathing-neutral dark:border-breathing-primary
                      bg-white dark:bg-breathing-dark/30
                      text-breathing-dark dark:text-breathing-neutral
                      rounded-md transition-colors duration-200"
          />
        </div>

        {/* Feedback Methods */}
        <div>
          <label className="block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-2">
            Feedback Methods
          </label>
          <div className="space-y-2">
            {Object.entries(settings.enabledMethods).map(
              ([method, enabled]) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() =>
                      updateSettings({
                        enabledMethods: {
                          ...settings.enabledMethods,
                          [method]: !enabled,
                        },
                      })
                    }
                    className="rounded text-breathing-primary"
                  />
                  <span className="text-sm text-breathing-dark dark:text-breathing-neutral capitalize">
                    {method.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Volume Controls */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-1">
            Chord Volume
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={settings.volume.chord}
            onChange={(e) =>
              updateSettings({
                volume: { ...settings.volume, chord: Number(e.target.value) },
              })
            }
            className="w-full accent-breathing-primary dark:accent-breathing-accent
                      transition-colors duration-200"
          />

          <label className="block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-1">
            Voice Volume
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={settings.volume.voice}
            onChange={(e) =>
              updateSettings({
                volume: { ...settings.volume, voice: Number(e.target.value) },
              })
            }
            className="w-full accent-breathing-primary dark:accent-breathing-accent
                      transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
}
