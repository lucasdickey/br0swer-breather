import { useBreathingStore } from '@/store/breathingStore.ts';

export function BreathingSettings() {
  const settings = useBreathingStore(state => state.settings);

  const updateSettings = useBreathingStore(state => state.updateSettings);

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cycles</label>
        <input
          type="range"
          min={1}
          max={10}
          value={settings.cycleCount}
          onChange={e => updateSettings({ cycleCount: Number(e.target.value) })}
          className="w-full"
        />
        <div className="text-sm text-right">{settings.cycleCount}</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Seconds per phase
        </label>
        <input
          type="range"
          min={2}
          max={10}
          value={settings.secondsPerPhase}
          onChange={e =>
            updateSettings({ secondsPerPhase: Number(e.target.value) })
          }
          className="w-full"
        />
        <div className="text-sm text-right">{settings.secondsPerPhase}s</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Voice volume</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={settings.volume.voice}
          onChange={e =>
            updateSettings({
              volume: { ...settings.volume, voice: Number(e.target.value) },
            })
          }
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tone volume</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={settings.volume.chord}
          onChange={e =>
            updateSettings({
              volume: { ...settings.volume, chord: Number(e.target.value) },
            })
          }
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.enabledMethods?.audioChord}
            onChange={e =>
              updateSettings({
                enabledMethods: {
                  ...settings.enabledMethods,
                  audioChord: e.target.checked,
                },
              })
            }
            className="mr-2"
          />
          <span className="text-sm">Enable audio tones</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.enabledMethods?.voiceGuide}
            onChange={e =>
              updateSettings({
                enabledMethods: {
                  ...settings.enabledMethods,
                  voiceGuide: e.target.checked,
                },
              })
            }
            className="mr-2"
          />
          <span className="text-sm">Enable voice guidance</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.enabledMethods?.visualGuide}
            onChange={e =>
              updateSettings({
                enabledMethods: {
                  ...settings.enabledMethods,
                  visualGuide: e.target.checked,
                },
              })
            }
            className="mr-2"
          />
          <span className="text-sm">Enable visual guidance</span>
        </label>
      </div>
    </div>
  );
}
