"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreathingVoice = BreathingVoice;
var react_1 = require("react");
var breathingStore_1 = require("@/store/breathingStore");
function BreathingVoice(_a) {
    var phase = _a.phase, secondsRemaining = _a.secondsRemaining;
    var settings = (0, breathingStore_1.useBreathingStore)(function (state) { return state.settings; });
    var lastSpokenRef = (0, react_1.useRef)("");
    (0, react_1.useEffect)(function () {
        if (!settings.enabledMethods.audioVoice || !window.speechSynthesis)
            return;
        var getMessage = function () {
            // Announce phase changes
            if (secondsRemaining === settings.secondsPerPhase) {
                switch (phase) {
                    case "inhale":
                        return "Breathe in";
                    case "hold-in":
                        return "Hold";
                    case "exhale":
                        return "Breathe out";
                    case "hold-out":
                        return "Hold";
                }
            }
            // Announce last 3 seconds of each phase
            if (secondsRemaining <= 3) {
                return secondsRemaining.toString();
            }
            return "";
        };
        var message = getMessage();
        // Prevent repeating the same message
        if (message && message !== lastSpokenRef.current) {
            lastSpokenRef.current = message;
            var utterance = new SpeechSynthesisUtterance(message);
            utterance.volume = settings.volume.voice;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            window.speechSynthesis.speak(utterance);
        }
    }, [
        phase,
        secondsRemaining,
        settings.enabledMethods.audioVoice,
        settings.volume.voice,
        settings.secondsPerPhase,
    ]);
    return null;
}
