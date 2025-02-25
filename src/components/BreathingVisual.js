"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreathingVisual = BreathingVisual;
var jsx_runtime_1 = require("react/jsx-runtime");
function BreathingVisual(_a) {
    var phase = _a.phase, progress = _a.progress;
    var baseSize = 80;
    var expandedSize = 100;
    var getSize = function () {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 flex items-center justify-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-white/10 transition-all duration-300", style: {
                    width: "".concat(getSize(), "%"),
                    height: "".concat(getSize(), "%"),
                } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 border border-white/20 rounded-full", style: {
                    clipPath: "inset(0 ".concat(100 - progress * 100, "% 0 0)"),
                } })] }));
}
