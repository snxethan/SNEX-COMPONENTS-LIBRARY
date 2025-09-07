"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const fa_1 = require("react-icons/fa");
const react_dom_1 = __importDefault(require("react-dom"));
const isPdfSupported = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isSafari = /safari/.test(ua) && !/chrome/.test(ua);
    const isMobile = /android|iphone|ipad|mobile/.test(ua);
    // Common cases where PDF rendering fails
    return !(isIOS || isSafari || isMobile);
};
const PDFModalViewer = ({ pdfUrl, onClose }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [isAnimatingOut, setIsAnimatingOut] = (0, react_1.useState)(false);
    const [isUnsupported, setIsUnsupported] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (pdfUrl) {
            setIsVisible(true);
            setIsUnsupported(!isPdfSupported());
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            const handleEscKey = (e) => {
                if (e.key === "Escape")
                    initiateClose();
            };
            window.addEventListener("keydown", handleEscKey);
            return () => {
                document.body.style.overflow = originalOverflow;
                window.removeEventListener("keydown", handleEscKey);
            };
        }
    }, [pdfUrl]);
    const initiateClose = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsAnimatingOut(false);
            setIsVisible(false);
            onClose();
        }, 300);
    };
    if (!pdfUrl || !isVisible)
        return null;
    return react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-16", onClick: (e) => {
            if (e.target === e.currentTarget)
                initiateClose();
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: `relative bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`, onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-3 sm:p-4 border-b border-[#333]", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => window.open(pdfUrl || "", "_blank"), className: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all", "aria-label": "Download or open in new tab", children: [(0, jsx_runtime_1.jsx)(fa_1.FaExternalLinkAlt, { size: 16 }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:inline", children: "Open in new tab" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: initiateClose, "aria-label": "Close Preview", className: "text-white hover:text-red-500 transition p-1 rounded-full", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 24 }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-auto relative bg-[#1a1a1a]", children: isUnsupported ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center h-full text-white text-sm p-6 text-center space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { children: "PDF preview is not supported on this device or browser." }), (0, jsx_runtime_1.jsx)("p", { children: "Please open the PDF in a new tab or download it to view." })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-white" }) })), (0, jsx_runtime_1.jsx)("iframe", { src: pdfUrl, className: "w-full min-h-[600px] h-[calc(100vh-150px)] max-h-[75vh] border-none", onLoad: () => setIsLoading(false), loading: "lazy" })] })) })] }) }), document.body);
};
exports.default = PDFModalViewer;
