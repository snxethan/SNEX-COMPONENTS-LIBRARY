"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
  useRef,
} from "react";
import { X } from "lucide-react";

interface ExternalLinkContextType {
  showWarning: boolean;
  targetUrl: string;
  isProfessional: boolean;
  handleExternalClick: (url: string, isProfessional?: boolean) => void;
  closeWarning: () => void;
}

const ExternalLinkContext = createContext<ExternalLinkContextType | undefined>(undefined);

export const ExternalLinkHandler = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const [isProfessional, setIsProfessional] = useState(false);

  const continueBtnRef = useRef<HTMLAnchorElement | null>(null);

  const handleExternalClick = (url: string, isProf: boolean = false) => {
    setTargetUrl(url);
    setIsProfessional(isProf);
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
    const prevOverflow = document.body.style.overflow;
    if (isVisible) {
      document.body.style.overflow = "hidden";
      // focus the primary action for accessibility
      setTimeout(() => continueBtnRef.current?.focus(), 0);

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeWarning();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    } else {
      document.body.style.overflow = prevOverflow;
    }
  }, [isVisible]);

  return (
    <ExternalLinkContext.Provider
      value={{
        showWarning: isVisible,
        targetUrl,
        isProfessional,
        handleExternalClick,
        closeWarning,
      }}
    >
      {children}

      {isVisible && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeWarning();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ext-link-title"
            className={`bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-md shadow-xl ${
              isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#333]">
              <h3 id="ext-link-title" className="text-xl font-semibold text-white">
                External Link Notice
              </h3>
              <button
                onClick={closeWarning}
                aria-label="Close"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
              {isProfessional ? (
                <>
                  <p className="text-gray-300 text-sm mb-2">
                    You are about to visit a <b>professional platform</b> or external resource.
                  </p>
                  <p className="text-gray-200 text-sm mb-4">
                    The content on this platform may not reflect my personal views and is owned by a third party.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-300 text-sm mb-2">
                    You are about to visit a <b>social platform</b> or external resource.
                  </p>
                  <p className="text-gray-200 text-sm mb-4">
                    Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity.
                  </p>
                </>
              )}

              <p className="text-gray-100 text-sm mb-6">Please proceed with <b>caution</b>.</p>

              <a
                ref={continueBtnRef}
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={closeWarning}
                className="inline-flex items-center justify-center w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                Continue
              </a>
            </div>
          </div>
        </div>
      )}
    </ExternalLinkContext.Provider>
  );
};

export const useExternalLink = () => {
  const ctx = useContext(ExternalLinkContext);
  if (!ctx) throw new Error("useExternalLink must be used within an ExternalLinkHandler");
  return ctx;
};
