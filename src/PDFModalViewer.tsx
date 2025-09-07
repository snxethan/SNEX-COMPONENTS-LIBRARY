"use client"

import React, { useEffect, useState } from "react"
import { X, Download, Loader2, ExternalLinkIcon } from "lucide-react"
import { FaExternalLinkAlt } from "react-icons/fa";
import ReactDOM from "react-dom"
import { lockBodyScroll, unlockBodyScroll } from "./utils/bodyScrollLock"

interface PDFModalViewerProps {
  pdfUrl: string | null
  onClose: () => void
}

const isPdfSupported = (): boolean => {
  const ua = navigator.userAgent.toLowerCase()
  const isIOS = /iphone|ipad|ipod/.test(ua)
  const isSafari = /safari/.test(ua) && !/chrome/.test(ua)
  const isMobile = /android|iphone|ipad|mobile/.test(ua)

  // Common cases where PDF rendering fails
  return !(isIOS || isSafari || isMobile)
}

const PDFModalViewer: React.FC<PDFModalViewerProps> = ({ pdfUrl, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [isUnsupported, setIsUnsupported] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (pdfUrl) {
      setIsVisible(true)
      setIsUnsupported(!isPdfSupported())

      lockBodyScroll()

      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") initiateClose()
      }

      window.addEventListener("keydown", handleEscKey)

      return () => {
        unlockBodyScroll()
        window.removeEventListener("keydown", handleEscKey)
      }
    }
  }, [pdfUrl])

  const initiateClose = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsAnimatingOut(false)
      setIsVisible(false)
      onClose()
    }, 300)
  }

  if (!pdfUrl || !isVisible) return null

  return ReactDOM.createPortal(
 <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-16"
      onClick={(e) => {
        if (e.target === e.currentTarget) initiateClose()
      }}
    >
      <div
        className={`relative bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col ${
          isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#333]">
          <button
            onClick={() => window.open(pdfUrl || "", "_blank")}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            aria-label="Download or open in new tab"
          >
            <FaExternalLinkAlt size={16} />
            <span className="hidden sm:inline">Open in new tab</span>
          </button>
          <button
            onClick={initiateClose}
            aria-label="Close Preview"
            className="text-white hover:text-red-500 transition p-1 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* PDF View / Fallback */}
        <div className="flex-1 overflow-auto relative bg-[#1a1a1a]">
          {isUnsupported ? (
           <div className="flex flex-col items-center justify-center h-full text-white text-sm p-6 text-center space-y-2">
            <p>PDF preview is not supported on this device or browser.</p>
            <p>Please open the PDF in a new tab or download it to view.</p>
          </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              <iframe
                src={pdfUrl}
              className="w-full min-h-[600px] h-[calc(100vh-150px)] max-h-[75vh] border-none"
                onLoad={() => setIsLoading(false)}
                loading="lazy"
              />
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default PDFModalViewer
