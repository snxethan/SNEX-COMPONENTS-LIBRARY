// src/components/ContactFormModal.tsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { jsx, jsxs } from "react/jsx-runtime";
function ContactFormModal({ onClose }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        // api endpoint to send the email
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        toast.success("Message sent successfully!");
        onClose();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again later.");
    }
  };
  useEffect(() => {
    setMounted(true);
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);
  const close = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 300);
  };
  const modalContent = /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm",
      onClick: close,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: `bg-[#1e1e1e] text-white border border-[#333] rounded-xl p-6 max-w-md w-full relative ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: close,
                className: "absolute top-1 right-3 text-3xl text-gray-400 hover:text-red-500",
                children: "\xD7 "
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4", children: "Contact Me" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              " ",
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  placeholder: "Your Name",
                  className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444]",
                  value: name,
                  onChange: (e) => setName(e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  required: true,
                  placeholder: "Your Email",
                  className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444]",
                  value: email,
                  onChange: (e) => setEmail(e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  required: true,
                  placeholder: "Your Message",
                  className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444] h-32",
                  value: message,
                  onChange: (e) => setMessage(e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded",
                  children: "Send Message"
                }
              )
            ] })
          ]
        }
      )
    }
  );
  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}

// src/components/ExternalLinkHandler.tsx
import {
  createContext,
  useContext,
  useState as useState2,
  useEffect as useEffect2
} from "react";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ExternalLinkContext = createContext(
  void 0
);
var ExternalLinkHandler = ({ children }) => {
  const [isVisible, setIsVisible] = useState2(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState2(false);
  const [targetUrl, setTargetUrl] = useState2("");
  const [isProfessional, setIsProfessional] = useState2(false);
  const handleExternalClick = (url, isProfessional2 = false) => {
    setTargetUrl(url);
    setIsProfessional(isProfessional2);
    setIsVisible(true);
  };
  const closeWarning = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      setIsVisible(false);
      setTargetUrl("");
      setIsProfessional(false);
    }, 300);
  };
  useEffect2(() => {
    if (isVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);
  return /* @__PURE__ */ jsxs2(
    ExternalLinkContext.Provider,
    {
      value: {
        showWarning: isVisible,
        targetUrl,
        isProfessional,
        handleExternalClick,
        closeWarning
      },
      children: [
        children,
        isVisible && /* @__PURE__ */ jsx2(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 animate-fade-in p-4",
            onClick: closeWarning,
            children: /* @__PURE__ */ jsxs2(
              "div",
              {
                className: `bg-[#1a1a1a] border border-[#333] rounded-xl p-6 max-w-md w-full text-center relative ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsx2(
                    "button",
                    {
                      onClick: closeWarning,
                      "aria-label": "Close",
                      className: "absolute top-1 right-3 text-gray-400 hover:text-red-500 text-4xl",
                      children: "\xD7"
                    }
                  ),
                  /* @__PURE__ */ jsx2("h3", { className: "text-xl font-semibold text-white mb-2", children: "External Link Notice" }),
                  isProfessional ? /* @__PURE__ */ jsxs2(Fragment, { children: [
                    /* @__PURE__ */ jsxs2("p", { className: "text-gray-300 text-sm mb-4", children: [
                      "You are about to visit a ",
                      /* @__PURE__ */ jsx2("b", { children: "professional platform" }),
                      " or external resource."
                    ] }),
                    /* @__PURE__ */ jsx2("p", { className: "text-gray-200 text-sm mb-4", children: "The content on this platform may not reflect my personal views and is owned by a third party." })
                  ] }) : /* @__PURE__ */ jsxs2(Fragment, { children: [
                    /* @__PURE__ */ jsxs2("p", { className: "text-gray-300 text-sm mb-4", children: [
                      "You are about to visit a ",
                      /* @__PURE__ */ jsx2("b", { children: "social platform" }),
                      " or external resource."
                    ] }),
                    /* @__PURE__ */ jsx2("p", { className: "text-gray-200 text-sm mb-4", children: "Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity." })
                  ] }),
                  /* @__PURE__ */ jsxs2("p", { className: "text-gray-100 text-sm mb-4", children: [
                    "Please proceed with ",
                    /* @__PURE__ */ jsx2("b", { children: "caution" }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsx2("div", { className: "flex justify-center gap-4", children: /* @__PURE__ */ jsx2(
                    "a",
                    {
                      href: targetUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      onClick: closeWarning,
                      className: "flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg transition-all",
                      children: "Continue"
                    }
                  ) })
                ]
              }
            )
          }
        )
      ]
    }
  );
};
var useExternalLink = () => {
  const context = useContext(ExternalLinkContext);
  if (!context) {
    throw new Error("useExternalLink must be used within an ExternalLinkHandler");
  }
  return context;
};

// src/components/PDFModalViewer.tsx
import { useEffect as useEffect3, useState as useState3 } from "react";
import { X, Loader2 } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import ReactDOM from "react-dom";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var isPdfSupported = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome/.test(ua);
  const isMobile = /android|iphone|ipad|mobile/.test(ua);
  return !(isIOS || isSafari || isMobile);
};
var PDFModalViewer = ({ pdfUrl, onClose }) => {
  const [isVisible, setIsVisible] = useState3(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState3(false);
  const [isUnsupported, setIsUnsupported] = useState3(false);
  const [isLoading, setIsLoading] = useState3(true);
  useEffect3(() => {
    if (pdfUrl) {
      setIsVisible(true);
      setIsUnsupported(!isPdfSupported());
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleEscKey = (e) => {
        if (e.key === "Escape") initiateClose();
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
  if (!pdfUrl || !isVisible) return null;
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsx3(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-16",
        onClick: (e) => {
          if (e.target === e.currentTarget) initiateClose();
        },
        children: /* @__PURE__ */ jsxs3(
          "div",
          {
            className: `relative bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between p-3 sm:p-4 border-b border-[#333]", children: [
                /* @__PURE__ */ jsxs3(
                  "button",
                  {
                    onClick: () => window.open(pdfUrl || "", "_blank"),
                    className: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
                    "aria-label": "Download or open in new tab",
                    children: [
                      /* @__PURE__ */ jsx3(FaExternalLinkAlt, { size: 16 }),
                      /* @__PURE__ */ jsx3("span", { className: "hidden sm:inline", children: "Open in new tab" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    onClick: initiateClose,
                    "aria-label": "Close Preview",
                    className: "text-white hover:text-red-500 transition p-1 rounded-full",
                    children: /* @__PURE__ */ jsx3(X, { size: 24 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx3("div", { className: "flex-1 overflow-auto relative bg-[#1a1a1a]", children: isUnsupported ? /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center justify-center h-full text-white text-sm p-6 text-center space-y-2", children: [
                /* @__PURE__ */ jsx3("p", { children: "PDF preview is not supported on this device or browser." }),
                /* @__PURE__ */ jsx3("p", { children: "Please open the PDF in a new tab or download it to view." })
              ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
                isLoading && /* @__PURE__ */ jsx3("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10", children: /* @__PURE__ */ jsx3(Loader2, { className: "h-8 w-8 animate-spin text-white" }) }),
                /* @__PURE__ */ jsx3(
                  "iframe",
                  {
                    src: pdfUrl,
                    className: "w-full min-h-[600px] h-[calc(100vh-150px)] max-h-[75vh] border-none",
                    onLoad: () => setIsLoading(false),
                    loading: "lazy"
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    document.body
  );
};
var PDFModalViewer_default = PDFModalViewer;

// src/components/SecurityPolicyModal.tsx
import { useState as useState4, useEffect as useEffect4 } from "react";
import { FaShieldAlt, FaUserShield, FaLink, FaCookie } from "react-icons/fa";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function SecurityPolicyModal({ onClose }) {
  const [showContact, setShowContact] = useState4(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState4(false);
  useEffect4(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in",
      onClick: (e) => {
        if (e.target === e.currentTarget) handleClose();
      },
      children: [
        /* @__PURE__ */ jsxs4(
          "div",
          {
            className: `bg-[#222222] rounded-xl border border-[#333333] shadow-lg p-8 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx4(
                "button",
                {
                  onClick: handleClose,
                  className: "absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors",
                  "aria-label": "Close",
                  children: "\xD7"
                }
              ),
              /* @__PURE__ */ jsxs4("h1", { className: "text-3xl font-bold text-white mb-8 relative text-center", children: [
                "Security Policy",
                /* @__PURE__ */ jsx4("span", { className: "absolute bottom-[-8px] left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500" })
              ] }),
              /* @__PURE__ */ jsxs4("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxs4("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsx4(FaShieldAlt, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "Reporting Security Issues" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "text-gray-300", children: [
                    /* @__PURE__ */ jsx4("p", { className: "mb-4", children: "If you discover a security vulnerability or have concerns about the website's security, please get in touch immediately. All reports will be investigated promptly." }),
                    /* @__PURE__ */ jsx4("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx4(
                      "button",
                      {
                        onClick: () => setShowContact(true),
                        className: "inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95",
                        children: "Contact Me"
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs4("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsx4(FaUserShield, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "Data Protection" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "text-gray-300 space-y-2", children: [
                    /* @__PURE__ */ jsx4("p", { children: "This website prioritizes your privacy and data protection:" }),
                    /* @__PURE__ */ jsxs4("ul", { className: "list-disc list-inside space-y-1 ml-4", children: [
                      /* @__PURE__ */ jsx4("li", { children: "No personal information is collected or stored" }),
                      /* @__PURE__ */ jsx4("li", { children: "Analytics are anonymized for performance monitoring only" }),
                      /* @__PURE__ */ jsx4("li", { children: "No tracking cookies are used without explicit consent" }),
                      /* @__PURE__ */ jsx4("li", { children: "Data is transmitted securely using HTTPS" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs4("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsx4(FaLink, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "External Links" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "text-gray-300 space-y-2", children: [
                    /* @__PURE__ */ jsx4("p", { children: "This website includes links to external websites and resources:" }),
                    /* @__PURE__ */ jsxs4("ul", { className: "list-disc list-inside space-y-1 ml-4", children: [
                      /* @__PURE__ */ jsx4("li", { children: "All external links are clearly marked" }),
                      /* @__PURE__ */ jsx4("li", { children: "Users are notified before leaving the site" }),
                      /* @__PURE__ */ jsx4("li", { children: "Third-party content is reviewed for safety" }),
                      /* @__PURE__ */ jsx4("li", { children: "I am not responsible for external website content" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs4("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsx4(FaCookie, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "Cookie Policy" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "text-gray-300 space-y-2", children: [
                    /* @__PURE__ */ jsx4("p", { children: "This website uses cookies responsibly:" }),
                    /* @__PURE__ */ jsxs4("ul", { className: "list-disc list-inside space-y-1 ml-4", children: [
                      /* @__PURE__ */ jsx4("li", { children: "Essential cookies for basic functionality only" }),
                      /* @__PURE__ */ jsx4("li", { children: "No tracking or analytics cookies without consent" }),
                      /* @__PURE__ */ jsx4("li", { children: "Session cookies are removed when you close your browser" }),
                      /* @__PURE__ */ jsx4("li", { children: "You can disable cookies in your browser settings" })
                    ] })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        showContact && /* @__PURE__ */ jsx4(ContactFormModal, { onClose: () => setShowContact(false) })
      ]
    }
  );
}

// src/components/ToolTipWrapper.tsx
import {
  useState as useState5,
  useRef,
  useMemo,
  useCallback
} from "react";
import { Loader2 as Loader22 } from "lucide-react";
import { Fragment as Fragment3, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var TooltipWrapper = ({ label, children, url, fullWidth = false }) => {
  const [visible, setVisible] = useState5(false);
  const [thumbnailLoading, setThumbnailLoading] = useState5(false);
  const [thumbnailError, setThumbnailError] = useState5(false);
  const timeoutRef = useRef(null);
  const isHovering = useRef(false);
  const isPdf = useMemo(() => url?.toLowerCase().endsWith(".pdf") ?? false, [url]);
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
    setThumbnailLoading(false);
  }, []);
  const handleThumbnailLoad = () => setThumbnailLoading(false);
  const handleThumbnailError = () => {
    setThumbnailLoading(false);
    setThumbnailError(true);
  };
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: `relative group ${fullWidth ? "w-full" : "inline-block"}`,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        children,
        visible && /* @__PURE__ */ jsx5(Fragment3, { children: isPdf ? /* @__PURE__ */ jsx5(
          "div",
          {
            role: "tooltip",
            "aria-label": label,
            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a1a] border border-[#333] rounded-md shadow-xl z-50 p-2 w-[220px] max-w-[90vw] transition-all duration-200 ease-out opacity-100 scale-100 animate-elastic-in",
            children: /* @__PURE__ */ jsxs5("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx5("div", { className: "text-xs text-white mb-1 font-medium", children: label }),
              /* @__PURE__ */ jsxs5("div", { className: "relative w-full h-[260px] bg-[#111] rounded overflow-hidden", children: [
                thumbnailLoading && /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 flex items-center justify-center bg-[#111]", children: /* @__PURE__ */ jsx5(Loader22, { className: "h-6 w-6 animate-spin text-white/70" }) }),
                thumbnailError ? /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 flex items-center justify-center text-white/70 text-xs p-2 text-center", children: "Unable to generate preview" }) : /* @__PURE__ */ jsx5(
                  "embed",
                  {
                    src: url,
                    type: "application/pdf",
                    className: "w-full h-full min-h-[260px]",
                    onLoad: handleThumbnailLoad,
                    onError: handleThumbnailError
                  }
                ),
                /* @__PURE__ */ jsx5("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between text-xs text-white", children: [
                  /* @__PURE__ */ jsx5("span", { className: "truncate max-w-[140px]", children: "PDF Document" }),
                  /* @__PURE__ */ jsx5("span", { className: "text-white/70", children: "Preview" })
                ] }) })
              ] })
            ] })
          }
        ) : /* @__PURE__ */ jsx5(
          "div",
          {
            role: "tooltip",
            "aria-label": label,
            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-red-600 text-white rounded-md shadow-md z-50 whitespace-nowrap transition-all duration-200 ease-out opacity-100 scale-100 animate-elastic-in",
            children: label
          }
        ) })
      ]
    }
  );
};
var ToolTipWrapper_default = TooltipWrapper;
export {
  ContactFormModal,
  ExternalLinkHandler,
  PDFModalViewer_default as PDFModalViewer,
  SecurityPolicyModal,
  ToolTipWrapper_default as TooltipWrapper,
  useExternalLink
};
//# sourceMappingURL=index.js.map