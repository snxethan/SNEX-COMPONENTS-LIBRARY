"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { createPortal } from "react-dom";

interface PDFModalViewerProps {
  pdfUrl: string | null;
  onClose: () => void;
}

// Allow Safari on macOS, block iOS & most mobile for iframe previews
const isPdfEmbedSupported = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isMobile = /android|iphone|ipad|mobile/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
  const isMac = /macintosh|mac os x/.test(ua);
  // iOS: no; Android mobile: often flaky; Safari only allowed on macOS
  return !(isIOS || (isSafari && !isMac) || (isMobile && !isSafari));
};

const PDFModalViewer: React.FC<PDFModalViewerProps> = ({ pdfUrl, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [animOut, setAnimOut] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [loading, setLoading] = useState(true);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const openInNewTab = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  // Build once per URL (reset loading state)
  useEffect(() => {
    if (!pdfUrl) return;
    setVisible(true);
    setUnsupported(!isPdfEmbedSupported());
    setLoading(true);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") initiateClose();
      if (e.key === "Tab") {
        // focus trap
        const root = modalRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    // Focus the primary action after mount
    setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("[data-focus-initial]")?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [pdfUrl]);

  const initiateClose = () => {
    setAnimOut(true);
    setTimeout(() => {
      setAnimOut(false);
      setVisible(false);
      onClose();
    }, 300);
  };

  const containerClasses = useMemo(
    () =>
      `fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-8`,
    []
  );

  if (!pdfUrl || !visible) return null;

  return createPortal(
    <div
      className={containerClasses}
      onClick={(e) => {
        if (e.target === e.currentTarget) initiateClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-modal-title"
        className={`relative bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col ${
          animOut ? "animate-elastic-out" : "animate-elastic-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#333]">
          <button
            type="button"
            onClick={openInNewTab}
            data-focus-initial
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-600"
            aria-label="Open in new tab"
          >
            <FaExternalLinkAlt size={16} />
            <span className="hidden sm:inline">Open in new tab</span>
          </button>
          <h2 id="pdf-modal-title" className="sr-only">
            PDF Preview
          </h2>
          <button
            type="button"
            onClick={initiateClose}
            aria-label="Close preview"
            className="text-white hover:text-red-500 transition p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 bg-[#1a1a1a]">
          {unsupported ? (
            <div className="flex flex-col items-center justify-center h-full text-white text-sm p-6 text-center space-y-3">
              <p>Inline PDF preview isn’t supported on this device/browser.</p>
              <button
                type="button"
                onClick={openInNewTab}
                className="mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                Open PDF in new tab
              </button>
            </div>
          ) : (
            <>
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a1a]">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              <iframe
                src={pdfUrl}
                title="PDF preview"
                className="w-full h-[min(80vh,900px)]"
                onLoad={() => setLoading(false)}
                loading="lazy"
              />
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PDFModalViewer;
