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
exports.BreathingSettings = BreathingSettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var breathingStore_1 = require("@/store/breathingStore");
function BreathingSettings() {
    // Use separate selectors for each value to avoid object creation
    var settings = (0, breathingStore_1.useBreathingStore)(function (state) { return state.settings; });
    var updateSettings = (0, breathingStore_1.useBreathingStore)(function (state) { return state.updateSettings; });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md p-6 bg-white dark:bg-breathing-dark/50 rounded-lg shadow-lg\n                    transition-colors duration-300", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-breathing-dark dark:text-breathing-neutral mb-4", children: "Settings" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-1", children: "Number of Cycles" }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: 1, max: 10, value: settings.cycleCount, onChange: function (e) {
                                    return updateSettings({ cycleCount: Number(e.target.value) });
                                }, className: "w-full px-3 py-2 border border-breathing-neutral dark:border-breathing-primary\n                      bg-white dark:bg-breathing-dark/30\n                      text-breathing-dark dark:text-breathing-neutral\n                      rounded-md transition-colors duration-200" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-2", children: "Feedback Methods" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: Object.entries(settings.enabledMethods).map(function (_a) {
                                    var method = _a[0], enabled = _a[1];
                                    return ((0, jsx_runtime_1.jsxs)("label", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: enabled, onChange: function () {
                                                    var _a;
                                                    return updateSettings({
                                                        enabledMethods: __assign(__assign({}, settings.enabledMethods), (_a = {}, _a[method] = !enabled, _a)),
                                                    });
                                                }, className: "rounded text-breathing-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-breathing-dark dark:text-breathing-neutral capitalize", children: method.replace(/([A-Z])/g, " $1").trim() })] }, method));
                                }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-1", children: "Chord Volume" }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: 0, max: 1, step: 0.1, value: settings.volume.chord, onChange: function (e) {
                                    return updateSettings({
                                        volume: __assign(__assign({}, settings.volume), { chord: Number(e.target.value) }),
                                    });
                                }, className: "w-full accent-breathing-primary dark:accent-breathing-accent\n                      transition-colors duration-200" }), (0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-breathing-dark dark:text-breathing-neutral mb-1", children: "Voice Volume" }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: 0, max: 1, step: 0.1, value: settings.volume.voice, onChange: function (e) {
                                    return updateSettings({
                                        volume: __assign(__assign({}, settings.volume), { voice: Number(e.target.value) }),
                                    });
                                }, className: "w-full accent-breathing-primary dark:accent-breathing-accent\n                      transition-colors duration-200" })] })] })] }));
}
