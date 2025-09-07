"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, } from "react";
import { lockBodyScroll, unlockBodyScroll } from "./utils/bodyScrollLock";
const ExternalLinkContext = createContext(undefined);
export const ExternalLinkHandler = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [targetUrl, setTargetUrl] = useState("");
    const [isProfessional, setIsProfessional] = useState(false);
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
    useEffect(() => {
        if (isVisible) {
            lockBodyScroll();
        }
        else {
            unlockBodyScroll();
        }
        return () => {
            if (isVisible) {
                unlockBodyScroll();
            }
        };
    }, [isVisible]);
    return (_jsxs(ExternalLinkContext.Provider, { value: {
            showWarning: isVisible,
            targetUrl,
            isProfessional,
            handleExternalClick,
            closeWarning,
        }, children: [children, isVisible && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 animate-fade-in p-4", onClick: closeWarning, children: _jsxs("div", { className: `bg-[#1a1a1a] border border-[#333] rounded-xl p-6 max-w-md w-full text-center relative ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`, onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: closeWarning, "aria-label": "Close", className: "absolute top-1 right-3 text-gray-400 hover:text-red-500 text-4xl", children: "\u00D7" }), _jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: "External Link Notice" }), isProfessional ? (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-gray-300 text-sm mb-4", children: ["You are about to visit a ", _jsx("b", { children: "professional platform" }), " or external resource."] }), _jsx("p", { className: "text-gray-200 text-sm mb-4", children: "The content on this platform may not reflect my personal views and is owned by a third party." })] })) : (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-gray-300 text-sm mb-4", children: ["You are about to visit a ", _jsx("b", { children: "social platform" }), " or external resource."] }), _jsx("p", { className: "text-gray-200 text-sm mb-4", children: "Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity." })] })), _jsxs("p", { className: "text-gray-100 text-sm mb-4", children: ["Please proceed with ", _jsx("b", { children: "caution" }), "."] }), _jsx("div", { className: "flex justify-center gap-4", children: _jsx("a", { href: targetUrl, target: "_blank", rel: "noopener noreferrer", onClick: closeWarning, className: "flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg transition-all", children: "Continue" }) })] }) }))] }));
};
export const useExternalLink = () => {
    const context = useContext(ExternalLinkContext);
    if (!context) {
        throw new Error("useExternalLink must be used within an ExternalLinkHandler");
    }
    return context;
};
