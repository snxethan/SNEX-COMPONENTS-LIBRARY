"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExternalLink = exports.ExternalLinkHandler = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ExternalLinkContext = (0, react_1.createContext)(undefined);
const ExternalLinkHandler = ({ children }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [isAnimatingOut, setIsAnimatingOut] = (0, react_1.useState)(false);
    const [targetUrl, setTargetUrl] = (0, react_1.useState)("");
    const [isProfessional, setIsProfessional] = (0, react_1.useState)(false);
    const handleExternalClick = (url, isProfessional = false) => {
        setTargetUrl(url);
        setIsProfessional(isProfessional);
        setIsVisible(true);
    };
    const closeWarning = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsAnimatingOut(false);
            setIsVisible(false);
            setTargetUrl("");
            setIsProfessional(false);
        }, 300); // match elastic-out duration
    };
    (0, react_1.useEffect)(() => {
        if (isVisible) {
            document.body.classList.add("overflow-hidden");
        }
        else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isVisible]);
    return ((0, jsx_runtime_1.jsxs)(ExternalLinkContext.Provider, { value: {
            showWarning: isVisible,
            targetUrl,
            isProfessional,
            handleExternalClick,
            closeWarning,
        }, children: [children, isVisible && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 animate-fade-in p-4", onClick: closeWarning, children: (0, jsx_runtime_1.jsxs)("div", { className: `bg-[#1a1a1a] border border-[#333] rounded-xl p-6 max-w-md w-full text-center relative ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`, onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("button", { onClick: closeWarning, "aria-label": "Close", className: "absolute top-1 right-3 text-gray-400 hover:text-red-500 text-4xl", children: "\u00D7" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-white mb-2", children: "External Link Notice" }), isProfessional ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-gray-300 text-sm mb-4", children: ["You are about to visit a ", (0, jsx_runtime_1.jsx)("b", { children: "professional platform" }), " or external resource."] }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-200 text-sm mb-4", children: "The content on this platform may not reflect my personal views and is owned by a third party." })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-gray-300 text-sm mb-4", children: ["You are about to visit a ", (0, jsx_runtime_1.jsx)("b", { children: "social platform" }), " or external resource."] }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-200 text-sm mb-4", children: "Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity." })] })), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-100 text-sm mb-4", children: ["Please proceed with ", (0, jsx_runtime_1.jsx)("b", { children: "caution" }), "."] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-4", children: (0, jsx_runtime_1.jsx)("a", { href: targetUrl, target: "_blank", rel: "noopener noreferrer", onClick: closeWarning, className: "flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg transition-all", children: "Continue" }) })] }) }))] }));
};
exports.ExternalLinkHandler = ExternalLinkHandler;
const useExternalLink = () => {
    const context = (0, react_1.useContext)(ExternalLinkContext);
    if (!context) {
        throw new Error("useExternalLink must be used within an ExternalLinkHandler");
    }
    return context;
};
exports.useExternalLink = useExternalLink;
