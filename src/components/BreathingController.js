"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreathingController = BreathingController;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var breathingStore_1 = require("../store/breathingStore");
var BreathingVisual_1 = require("./BreathingVisual");
var BreathingAudio_1 = require("./BreathingAudio");
var BreathingVoice_1 = require("./BreathingVoice");
function BreathingController() {
    var _a = (0, breathingStore_1.useBreathingStore)(), isActive = _a.isActive, currentPhase = _a.currentPhase, currentCycle = _a.currentCycle, secondsRemaining = _a.secondsRemaining, settings = _a.settings, start = _a.start, stop = _a.stop, updateTimer = _a.updateTimer, nextPhase = _a.nextPhase, updateSettings = _a.updateSettings;
    var timerRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        if (!isActive) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            return;
        }
        timerRef.current = setInterval(function () {
            var newSecondsRemaining = secondsRemaining - 1;
            if (newSecondsRemaining <= 0) {
                nextPhase();
            }
            else {
                updateTimer(newSecondsRemaining);
            }
            if (currentCycle > settings.cycleCount) {
                stop();
            }
        }, 1000);
        return function () {
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
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-black text-white", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-screen flex flex-col items-center justify-center relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute left-8 top-1/2 -translate-y-1/2", children: (0, jsx_runtime_1.jsx)("div", { className: "transform -rotate-90 translate-y-24 origin-left-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-white/60", children: "Voice" }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: 0, max: 1, step: 0.1, value: settings.volume.voice, onChange: function (e) {
                                        return updateSettings({
                                            volume: __assign(__assign({}, settings.volume), { voice: Number(e.target.value) }),
                                        });
                                    }, className: "w-48 accent-white opacity-60 hover:opacity-100 transition-opacity" })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col items-center gap-8", children: !isActive ? (
                    // Cycle Count Selector
                    (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl text-white/60", children: "Number of Cycles" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-4", children: [4, 6, 8, 10].map(function (count) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return updateSettings({ cycleCount: count }); }, className: "w-12 h-12 rounded-full flex items-center justify-center\n                      ".concat(settings.cycleCount === count
                                        ? "bg-white/20 text-white"
                                        : "text-white/60 hover:text-white"), children: count }, count)); }) })] })) : (
                    // Timer and Phase Display
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-4xl font-light", children: ["00:", secondsRemaining.toString().padStart(2, "0")] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-64 h-64", children: [(0, jsx_runtime_1.jsx)(BreathingVisual_1.BreathingVisual, { phase: currentPhase, progress: 1 - secondsRemaining / settings.secondsPerPhase }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "text-6xl font-light", children: currentCycle }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-xl text-white/60 lowercase", children: currentPhase === "prepare"
                                    ? "get ready (".concat(secondsRemaining, ")")
                                    : currentPhase.replace("-", " ") })] })) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-8 top-1/2 -translate-y-1/2", children: (0, jsx_runtime_1.jsx)("div", { className: "transform -rotate-90 -translate-y-24 origin-right-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-white/60", children: "Tone" }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: 0, max: 1, step: 0.1, value: settings.volume.chord, onChange: function (e) {
                                        return updateSettings({
                                            volume: __assign(__assign({}, settings.volume), { chord: Number(e.target.value) }),
                                        });
                                    }, className: "w-48 accent-white opacity-60 hover:opacity-100 transition-opacity" })] }) }) }), isActive ? ((0, jsx_runtime_1.jsx)("button", { onClick: stop, className: "absolute bottom-8 text-xl text-white/60 hover:text-white transition-colors", children: "Stop" })) : ((0, jsx_runtime_1.jsx)("button", { onClick: start, className: "absolute bottom-8 text-xl text-white/60 hover:text-white transition-colors", children: "Start" })), (0, jsx_runtime_1.jsxs)("div", { className: "hidden", children: [(0, jsx_runtime_1.jsx)(BreathingAudio_1.BreathingAudio, { phase: currentPhase }), (0, jsx_runtime_1.jsx)(BreathingVoice_1.BreathingVoice, { phase: currentPhase, secondsRemaining: secondsRemaining })] })] }) }));
}
