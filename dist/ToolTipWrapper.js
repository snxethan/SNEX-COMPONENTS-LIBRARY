"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useMemo, useCallback, } from "react";
import { Loader2 } from "lucide-react";
const TooltipWrapper = ({ label, children, url, fullWidth = false }) => {
    const [visible, setVisible] = useState(false);
    const [thumbnailLoading, setThumbnailLoading] = useState(false);
    const [thumbnailError, setThumbnailError] = useState(false);
    const timeoutRef = useRef(null);
    const isHovering = useRef(false);
    const isPdf = useMemo(() => { var _a; return (_a = url === null || url === void 0 ? void 0 : url.toLowerCase().endsWith(".pdf")) !== null && _a !== void 0 ? _a : false; }, [url]);
    const handleMouseEnter = useCallback(() => {
        isHovering.current = true;
        timeoutRef.current = setTimeout(() => {
            if (isHovering.current) {
                setVisible(true);
                if (isPdf) {
                    setThumbnailLoading(true);
                    setThumbnailError(false);
                }
            }
        }, 500);
    }, [isPdf]);
    const handleMouseLeave = useCallback(() => {
        isHovering.current = false;
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
        setVisible(false);
        setThumbnailLoading(false);
    }, []);
    const handleThumbnailLoad = () => setThumbnailLoading(false);
    const handleThumbnailError = () => {
        setThumbnailLoading(false);
        setThumbnailError(true);
    };
    return (_jsxs("div", { className: `relative group ${fullWidth ? "w-full" : "inline-block"}`, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [children, visible && (_jsx(_Fragment, { children: isPdf ? (_jsx("div", { role: "tooltip", "aria-label": label, className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a1a] border border-[#333] rounded-md shadow-xl z-50 p-2 w-[220px] max-w-[90vw] transition-all duration-200 ease-out opacity-100 scale-100 animate-elastic-in", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "text-xs text-white mb-1 font-medium", children: label }), _jsxs("div", { className: "relative w-full h-[260px] bg-[#111] rounded overflow-hidden", children: [thumbnailLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#111]", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin text-white/70" }) })), thumbnailError ? (_jsx("div", { className: "absolute inset-0 flex items-center justify-center text-white/70 text-xs p-2 text-center", children: "Unable to generate preview" })) : (_jsx("embed", { src: url, type: "application/pdf", className: "w-full h-full min-h-[260px]", onLoad: handleThumbnailLoad, onError: handleThumbnailError })), _jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2", children: _jsxs("div", { className: "flex items-center justify-between text-xs text-white", children: [_jsx("span", { className: "truncate max-w-[140px]", children: "PDF Document" }), _jsx("span", { className: "text-white/70", children: "Preview" })] }) })] })] }) })) : (_jsx("div", { role: "tooltip", "aria-label": label, className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-red-600 text-white rounded-md shadow-md z-50 whitespace-nowrap transition-all duration-200 ease-out opacity-100 scale-100 animate-elastic-in", children: label })) }))] }));
};
export default TooltipWrapper;
