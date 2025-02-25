"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
function RootLayout(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)("html", { lang: "en", children: [(0, jsx_runtime_1.jsx)("head", { children: (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: {
                        __html: "\n              if (localStorage.getItem('darkMode') === 'true' ||\n                  (!localStorage.getItem('darkMode') &&\n                    window.matchMedia('(prefers-color-scheme: dark)').matches)) {\n                document.documentElement.classList.add('dark');\n              }\n            ",
                    } }) }), (0, jsx_runtime_1.jsx)("body", { children: children })] }));
}
