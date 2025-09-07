"use client";

import { useState, useRef, useMemo, useCallback, type ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface PdfThumbnailTooltipProps {
  label: string;
  children: ReactNode;
  url?: string;
  fullWidth?: boolean;
}

const TooltipWrapper = ({
  label,
  children,
  url,
  fullWidth = false,
}: PdfThumbnailTooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Use number for browser timers (avoids NodeJS.Timeout typing issues in ESM bundlers)
  const timeoutRef = useRef<number | null>(null);
  const isHovering = useRef(false);


  const isPdf = useMemo(() => url?.toLowerCase().endsWith(".pdf") ?? false, [url]);

  const openWithDelay = useCallback(() => {
    isHovering.current = true;
    timeoutRef.current = window.setTimeout(() => {
      if (!isHovering.current) return;
      setVisible(true);
      if (isPdf) {
        setThumbnailLoading(true);
        setThumbnailError(false);
      }
    }, 500);
  }, [isPdf]);

  const closeNow = useCallback(() => {
    isHovering.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
    setThumbnailLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => closeNow(), [closeNow]);

  const handleThumbnailLoad = () => setThumbnailLoading(false);
  const handleThumbnailError = () => {
    setThumbnailLoading(false);
    setThumbnailError(true);
  };

  return (
    <span
      className={`relative group ${fullWidth ? "w-full" : "inline-block"}`}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeNow}
      onFocus={openWithDelay}   // keyboard focus (e.g., when child is a link/button)
      onBlur={closeNow}
      onTouchStart={openWithDelay} // basic mobile support
      onTouchEnd={closeNow}
    >
      {children}

      {visible && (
        <>
          {isPdf ? (
            <div
              role="tooltip"
              aria-label={label}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[60] w-[240px] max-w-[90vw]
                         rounded-md border border-[#333] bg-[#1a1a1a] p-2 shadow-xl transition-all
                         duration-200 ease-out opacity-100 scale-100 animate-elastic-in"
            >
              <div className="flex flex-col items-center">
                <div className="mb-1 text-xs font-medium text-white">{label}</div>

                <div className="relative w-full h-[260px] overflow-hidden rounded bg-[#111]">
                  {thumbnailLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#111]">
                      <Loader2 className="h-6 w-6 animate-spin text-white/70" />
                    </div>
                  )}

                  {thumbnailError ? (
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-white/70">
                      Unable to generate preview
                    </div>
                  ) : (
                    <embed
                      src={url}
                      type="application/pdf"
                      className="h-full w-full min-h-[260px]"
                      onLoad={handleThumbnailLoad}
                      onError={handleThumbnailError}
                    />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between text-xs text-white">
                      <span className="max-w-[140px] truncate">PDF Document</span>
                      <span className="text-white/70">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              role="tooltip"
              aria-label={label}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[60]
                         whitespace-nowrap rounded-md bg-red-600 px-2 py-1 text-xs text-white shadow-md
                         transition-all duration-200 ease-out opacity-100 scale-100 animate-zoom-rotate"
            >
              {label}
            </div>
          )}
        </>
      )}
    </span>
  );
};

export default TooltipWrapper;
