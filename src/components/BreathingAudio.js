"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreathingAudio = BreathingAudio;
var react_1 = require("react");
var breathingStore_1 = require("@/store/breathingStore");
function BreathingAudio(_a) {
    var phase = _a.phase;
    var audioContextRef = (0, react_1.useRef)();
    var oscillators = (0, react_1.useRef)([]);
    var _b = (0, breathingStore_1.useBreathingStore)(), settings = _b.settings, isActive = _b.isActive;
    (0, react_1.useEffect)(function () {
        // Only create AudioContext after user interaction
        var handleInteraction = function () {
            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContext();
            }
        };
        document.addEventListener("click", handleInteraction);
        return function () { return document.removeEventListener("click", handleInteraction); };
    }, []);
    (0, react_1.useEffect)(function () {
        // Stop all oscillators if not active
        if (!isActive) {
            oscillators.current.forEach(function (osc) {
                osc.stop();
                osc.disconnect();
            });
            oscillators.current = [];
            return;
        }
        if (!settings.enabledMethods.audioChord || !audioContextRef.current)
            return;
        // Define chord frequencies for each phase
        var chords = {
            prepare: [261.63, 329.63, 392.0], // C4, E4, G4 (C major - calming preparation)
            inhale: [392.0, 493.88, 587.33], // G4, B4, D5 (G major)
            "hold-in": [440.0, 554.37, 659.25], // A4, C#5, E5 (A major)
            exhale: [349.23, 440.0, 523.25], // F4, A4, C5 (F major)
            "hold-out": [329.63, 415.3, 493.88], // E4, G#4, B4 (E major)
        };
        // Clean up previous oscillators
        oscillators.current.forEach(function (osc) {
            osc.stop();
            osc.disconnect();
        });
        oscillators.current = [];
        // Create new oscillators for each note in the chord
        var masterGain = audioContextRef.current.createGain();
        masterGain.gain.value = settings.volume.chord * 0.2; // Reduced overall volume
        masterGain.connect(audioContextRef.current.destination);
        chords[phase].forEach(function (frequency, i) {
            var oscillator = audioContextRef.current.createOscillator();
            var gainNode = audioContextRef.current.createGain();
            oscillator.type = "sine";
            oscillator.frequency.value = frequency;
            // Slightly different volume for each note
            gainNode.gain.value = 1 - i * 0.2;
            oscillator.connect(gainNode);
            gainNode.connect(masterGain);
            oscillator.start();
            oscillators.current.push(oscillator);
        });
        return function () {
            oscillators.current.forEach(function (osc) {
                osc.stop();
                osc.disconnect();
            });
            oscillators.current = [];
        };
    }, [
        phase,
        settings.enabledMethods.audioChord,
        settings.volume.chord,
        isActive,
    ]);
    return null;
}
