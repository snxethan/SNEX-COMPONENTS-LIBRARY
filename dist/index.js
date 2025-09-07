"use client";

// src/components/ContactFormModal.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { jsx, jsxs } from "react/jsx-runtime";
function ContactFormModal({ onClose }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const firstFieldRef = useRef(null);
  const initiateClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 300);
  };
  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") initiateClose();
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("Message sent successfully!");
        onClose();
      } else {
        toast.error(data?.message || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again later.");
    }
  };
  if (!mounted) return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
        onClick: (e) => {
          if (e.target === e.currentTarget) initiateClose();
        },
        "aria-hidden": false,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "contact-modal-title",
            className: `relative bg-[#1a1a1a] text-white border border-[#333] rounded-xl w-full max-w-lg shadow-xl ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-[#333]", children: [
                /* @__PURE__ */ jsx("h3", { id: "contact-modal-title", className: "text-xl font-semibold", children: "Contact Me" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: initiateClose,
                    "aria-label": "Close",
                    className: "text-gray-400 hover:text-red-500 transition",
                    children: /* @__PURE__ */ jsx(X, { size: 20 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: firstFieldRef,
                    type: "text",
                    required: true,
                    placeholder: "Your Name",
                    className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444] focus:outline-none focus:ring-2 focus:ring-red-600",
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
                    className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444] focus:outline-none focus:ring-2 focus:ring-red-600",
                    value: email,
                    onChange: (e) => setEmail(e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    required: true,
                    placeholder: "Your Message",
                    className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444] h-32 focus:outline-none focus:ring-2 focus:ring-red-600",
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
              ] }) })
            ]
          }
        )
      }
    ),
    document.body
  );
}

// src/components/ExternalLinkHandler.tsx
import {
  useState as useState2,
  useEffect as useEffect2,
  createContext,
  useContext,
  useRef as useRef2
} from "react";
import { X as X2 } from "lucide-react";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ExternalLinkContext = createContext(void 0);
var ExternalLinkHandler = ({ children }) => {
  const [isVisible, setIsVisible] = useState2(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState2(false);
  const [targetUrl, setTargetUrl] = useState2("");
  const [isProfessional, setIsProfessional] = useState2(false);
  const continueBtnRef = useRef2(null);
  const handleExternalClick = (url, isProf = false) => {
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
    }, 300);
  };
  useEffect2(() => {
    const prevOverflow = document.body.style.overflow;
    if (isVisible) {
      document.body.style.overflow = "hidden";
      setTimeout(() => continueBtnRef.current?.focus(), 0);
      const onKey = (e) => {
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
            className: "fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in",
            onClick: (e) => {
              if (e.target === e.currentTarget) closeWarning();
            },
            children: /* @__PURE__ */ jsxs2(
              "div",
              {
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "ext-link-title",
                className: `bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-md shadow-xl ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between p-4 border-b border-[#333]", children: [
                    /* @__PURE__ */ jsx2("h3", { id: "ext-link-title", className: "text-xl font-semibold text-white", children: "External Link Notice" }),
                    /* @__PURE__ */ jsx2(
                      "button",
                      {
                        onClick: closeWarning,
                        "aria-label": "Close",
                        className: "text-gray-400 hover:text-red-500 transition",
                        children: /* @__PURE__ */ jsx2(X2, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "p-6 text-center", children: [
                    isProfessional ? /* @__PURE__ */ jsxs2(Fragment, { children: [
                      /* @__PURE__ */ jsxs2("p", { className: "text-gray-300 text-sm mb-2", children: [
                        "You are about to visit a ",
                        /* @__PURE__ */ jsx2("b", { children: "professional platform" }),
                        " or external resource."
                      ] }),
                      /* @__PURE__ */ jsx2("p", { className: "text-gray-200 text-sm mb-4", children: "The content on this platform may not reflect my personal views and is owned by a third party." })
                    ] }) : /* @__PURE__ */ jsxs2(Fragment, { children: [
                      /* @__PURE__ */ jsxs2("p", { className: "text-gray-300 text-sm mb-2", children: [
                        "You are about to visit a ",
                        /* @__PURE__ */ jsx2("b", { children: "social platform" }),
                        " or external resource."
                      ] }),
                      /* @__PURE__ */ jsx2("p", { className: "text-gray-200 text-sm mb-4", children: "Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity." })
                    ] }),
                    /* @__PURE__ */ jsxs2("p", { className: "text-gray-100 text-sm mb-6", children: [
                      "Please proceed with ",
                      /* @__PURE__ */ jsx2("b", { children: "caution" }),
                      "."
                    ] }),
                    /* @__PURE__ */ jsx2(
                      "a",
                      {
                        ref: continueBtnRef,
                        href: targetUrl,
                        target: "_blank",
                        rel: "noopener noreferrer nofollow",
                        onClick: closeWarning,
                        className: "inline-flex items-center justify-center w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-600",
                        children: "Continue"
                      }
                    )
                  ] })
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
  const ctx = useContext(ExternalLinkContext);
  if (!ctx) throw new Error("useExternalLink must be used within an ExternalLinkHandler");
  return ctx;
};

// src/components/PDFModalViewer.tsx
import { useEffect as useEffect3, useMemo, useRef as useRef3, useState as useState3 } from "react";
import { X as X3, Loader2 } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { createPortal as createPortal2 } from "react-dom";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var isPdfEmbedSupported = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isMobile = /android|iphone|ipad|mobile/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
  const isMac = /macintosh|mac os x/.test(ua);
  return !(isIOS || isSafari && !isMac || isMobile && !isSafari);
};
var PDFModalViewer = ({ pdfUrl, onClose }) => {
  const [visible, setVisible] = useState3(false);
  const [animOut, setAnimOut] = useState3(false);
  const [unsupported, setUnsupported] = useState3(false);
  const [loading, setLoading] = useState3(true);
  const modalRef = useRef3(null);
  const openInNewTab = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };
  useEffect3(() => {
    if (!pdfUrl) return;
    setVisible(true);
    setUnsupported(!isPdfEmbedSupported());
    setLoading(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") initiateClose();
      if (e.key === "Tab") {
        const root = modalRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll(
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
    setTimeout(() => {
      modalRef.current?.querySelector("[data-focus-initial]")?.focus();
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
    () => `fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-8`,
    []
  );
  if (!pdfUrl || !visible) return null;
  return createPortal2(
    /* @__PURE__ */ jsx3(
      "div",
      {
        className: containerClasses,
        onClick: (e) => {
          if (e.target === e.currentTarget) initiateClose();
        },
        children: /* @__PURE__ */ jsxs3(
          "div",
          {
            ref: modalRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "pdf-modal-title",
            className: `relative bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col ${animOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between p-3 sm:p-4 border-b border-[#333]", children: [
                /* @__PURE__ */ jsxs3(
                  "button",
                  {
                    type: "button",
                    onClick: openInNewTab,
                    "data-focus-initial": true,
                    className: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-600",
                    "aria-label": "Open in new tab",
                    children: [
                      /* @__PURE__ */ jsx3(FaExternalLinkAlt, { size: 16 }),
                      /* @__PURE__ */ jsx3("span", { className: "hidden sm:inline", children: "Open in new tab" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx3("h2", { id: "pdf-modal-title", className: "sr-only", children: "PDF Preview" }),
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    type: "button",
                    onClick: initiateClose,
                    "aria-label": "Close preview",
                    className: "text-white hover:text-red-500 transition p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600",
                    children: /* @__PURE__ */ jsx3(X3, { size: 22 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx3("div", { className: "relative flex-1 bg-[#1a1a1a]", children: unsupported ? /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center justify-center h-full text-white text-sm p-6 text-center space-y-3", children: [
                /* @__PURE__ */ jsx3("p", { children: "Inline PDF preview isn\u2019t supported on this device/browser." }),
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    type: "button",
                    onClick: openInNewTab,
                    className: "mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-600",
                    children: "Open PDF in new tab"
                  }
                )
              ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
                loading && /* @__PURE__ */ jsx3("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a1a]", children: /* @__PURE__ */ jsx3(Loader2, { className: "h-8 w-8 animate-spin text-white" }) }),
                /* @__PURE__ */ jsx3(
                  "iframe",
                  {
                    src: pdfUrl,
                    title: "PDF preview",
                    className: "w-full h-[min(80vh,900px)]",
                    onLoad: () => setLoading(false),
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
import { useEffect as useEffect4, useState as useState4 } from "react";
import { X as X4 } from "lucide-react";
import { FaShieldAlt, FaUserShield, FaLink, FaCookie } from "react-icons/fa";
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function SecurityPolicyModal({ onClose }) {
  const [showContact, setShowContact] = useState4(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState4(false);
  useEffect4(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (!showContact && e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [showContact]);
  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsx4(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "security-policy-title",
        "aria-hidden": showContact,
        className: `fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-blur-sm
          ${showContact ? "opacity-0 pointer-events-none" : "animate-fade-in bg-black/50"}`,
        onClick: (e) => {
          if (e.target === e.currentTarget && !showContact) handleClose();
        },
        children: /* @__PURE__ */ jsxs4(
          "div",
          {
            className: `relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#333333] bg-[#222222] p-8 shadow-lg
            ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx4(
                "button",
                {
                  onClick: handleClose,
                  "aria-label": "Close",
                  className: "absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-600",
                  children: /* @__PURE__ */ jsx4(X4, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsxs4(
                "h1",
                {
                  id: "security-policy-title",
                  className: "relative mb-8 text-center text-3xl font-bold text-white",
                  children: [
                    "Security Policy",
                    /* @__PURE__ */ jsx4("span", { className: "absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-red-600 to-red-500" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs4("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxs4("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx4(FaShieldAlt, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "Reporting Security Issues" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "text-gray-300", children: [
                    /* @__PURE__ */ jsx4("p", { className: "mb-4", children: "If you discover a security vulnerability or have concerns about the website's security, please get in touch immediately. All reports will be investigated promptly." }),
                    /* @__PURE__ */ jsx4("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx4(
                      "button",
                      {
                        onClick: () => setShowContact(true),
                        className: "inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-white transition-all duration-200 ease-out hover:from-red-500 hover:to-red-400 hover:scale-105 active:scale-95",
                        children: "Contact Me"
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs4("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx4(FaUserShield, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "Data Protection" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "space-y-2 text-gray-300", children: [
                    /* @__PURE__ */ jsx4("p", { children: "This website prioritizes your privacy and data protection:" }),
                    /* @__PURE__ */ jsxs4("ul", { className: "ml-4 list-inside list-disc space-y-1", children: [
                      /* @__PURE__ */ jsx4("li", { children: "No personal information is collected or stored" }),
                      /* @__PURE__ */ jsx4("li", { children: "Analytics are anonymized for performance monitoring only" }),
                      /* @__PURE__ */ jsx4("li", { children: "No tracking cookies are used without explicit consent" }),
                      /* @__PURE__ */ jsx4("li", { children: "Data is transmitted securely using HTTPS" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs4("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx4(FaLink, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "External Links" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "space-y-2 text-gray-300", children: [
                    /* @__PURE__ */ jsx4("p", { children: "This website includes links to external websites and resources:" }),
                    /* @__PURE__ */ jsxs4("ul", { className: "ml-4 list-inside list-disc space-y-1", children: [
                      /* @__PURE__ */ jsx4("li", { children: "All external links are clearly marked" }),
                      /* @__PURE__ */ jsx4("li", { children: "Users are notified before leaving the site" }),
                      /* @__PURE__ */ jsx4("li", { children: "Third-party content is reviewed for safety" }),
                      /* @__PURE__ */ jsx4("li", { children: "I am not responsible for external website content" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs4("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ jsxs4("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx4(FaCookie, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold text-white", children: "Cookie Policy" })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "space-y-2 text-gray-300", children: [
                    /* @__PURE__ */ jsx4("p", { children: "This website uses cookies responsibly:" }),
                    /* @__PURE__ */ jsxs4("ul", { className: "ml-4 list-inside list-disc space-y-1", children: [
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
        )
      }
    ),
    showContact && /* @__PURE__ */ jsx4(ContactFormModal, { onClose: () => setShowContact(false) })
  ] });
}

// src/components/ToolTipWrapper.tsx
import { useState as useState5, useRef as useRef4, useMemo as useMemo2, useCallback, useEffect as useEffect5 } from "react";
import { Loader2 as Loader22 } from "lucide-react";
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var TooltipWrapper = ({
  label,
  children,
  url,
  fullWidth = false
}) => {
  const [visible, setVisible] = useState5(false);
  const [thumbnailLoading, setThumbnailLoading] = useState5(false);
  const [thumbnailError, setThumbnailError] = useState5(false);
  const timeoutRef = useRef4(null);
  const isHovering = useRef4(false);
  const isPdf = useMemo2(() => url?.toLowerCase().endsWith(".pdf") ?? false, [url]);
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
  useEffect5(() => () => closeNow(), [closeNow]);
  const handleThumbnailLoad = () => setThumbnailLoading(false);
  const handleThumbnailError = () => {
    setThumbnailLoading(false);
    setThumbnailError(true);
  };
  return /* @__PURE__ */ jsxs5(
    "span",
    {
      className: `relative group ${fullWidth ? "w-full" : "inline-block"}`,
      onMouseEnter: openWithDelay,
      onMouseLeave: closeNow,
      onFocus: openWithDelay,
      onBlur: closeNow,
      onTouchStart: openWithDelay,
      onTouchEnd: closeNow,
      children: [
        children,
        visible && /* @__PURE__ */ jsx5(Fragment4, { children: isPdf ? /* @__PURE__ */ jsx5(
          "div",
          {
            role: "tooltip",
            "aria-label": label,
            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[60] w-[240px] max-w-[90vw]\n                         rounded-md border border-[#333] bg-[#1a1a1a] p-2 shadow-xl transition-all\n                         duration-200 ease-out opacity-100 scale-100 animate-elastic-in",
            children: /* @__PURE__ */ jsxs5("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx5("div", { className: "mb-1 text-xs font-medium text-white", children: label }),
              /* @__PURE__ */ jsxs5("div", { className: "relative w-full h-[260px] overflow-hidden rounded bg-[#111]", children: [
                thumbnailLoading && /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-[#111]", children: /* @__PURE__ */ jsx5(Loader22, { className: "h-6 w-6 animate-spin text-white/70" }) }),
                thumbnailError ? /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-white/70", children: "Unable to generate preview" }) : /* @__PURE__ */ jsx5(
                  "embed",
                  {
                    src: url,
                    type: "application/pdf",
                    className: "h-full w-full min-h-[260px]",
                    onLoad: handleThumbnailLoad,
                    onError: handleThumbnailError
                  }
                ),
                /* @__PURE__ */ jsx5("div", { className: "absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between text-xs text-white", children: [
                  /* @__PURE__ */ jsx5("span", { className: "max-w-[140px] truncate", children: "PDF Document" }),
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
            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[60]\n                         whitespace-nowrap rounded-md bg-red-600 px-2 py-1 text-xs text-white shadow-md\n                         transition-all duration-200 ease-out opacity-100 scale-100 animate-zoom-rotate",
            children: label
          }
        ) })
      ]
    }
  );
};
var ToolTipWrapper_default = TooltipWrapper;

// src/components/Footer.tsx
import { useState as useState6, useEffect as useEffect6 } from "react";
import Image from "next/image";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var Footer = ({
  avatarSrc = "/images/avatar/snex.png",
  name = "Ethan Townsend",
  socialHref = "https://ethantownsend.dev",
  leftLabel = "Security Policy",
  links = [
    { label: "snex.dev", href: "https://snex.dev" },
    { label: "snxethan.dev", href: "https://snxethan.dev" },
    { label: "ethantownsend.dev", href: "https://ethantownsend.dev" }
  ]
}) => {
  const [showSecurityPolicy, setShowSecurityPolicy] = useState6(false);
  const [loading, setLoading] = useState6(true);
  useEffect6(() => setLoading(false), []);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  if (loading) {
    return /* @__PURE__ */ jsx6("footer", { className: "bg-[#121212] text-gray-400 w-full py-6 px-6", children: /* @__PURE__ */ jsx6("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-1 lg:grid-cols-3 items-center gap-4 text-sm", children: [
      /* @__PURE__ */ jsx6("div", { className: "justify-self-start h-5 w-24 bg-[#333] rounded animate-pulse" }),
      /* @__PURE__ */ jsxs6("div", { className: "justify-self-center flex items-center gap-2", children: [
        /* @__PURE__ */ jsx6("div", { className: "w-8 h-8 rounded-full bg-[#333] animate-pulse" }),
        /* @__PURE__ */ jsx6("div", { className: "h-5 w-40 bg-[#333] rounded animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxs6("div", { className: "justify-self-end flex items-center gap-4", children: [
        /* @__PURE__ */ jsx6("div", { className: "h-5 w-16 bg-[#333] rounded animate-pulse" }),
        /* @__PURE__ */ jsx6("div", { className: "h-5 w-24 bg-[#333] rounded animate-pulse" }),
        /* @__PURE__ */ jsx6("div", { className: "h-5 w-32 bg-[#333] rounded animate-pulse" })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxs6("footer", { className: "bg-[#121212] text-gray-400 w-full py-6 px-6", children: [
    /* @__PURE__ */ jsx6("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-1 lg:grid-cols-3 items-center gap-4 text-sm", children: [
      /* @__PURE__ */ jsx6("div", { className: "justify-self-start", children: /* @__PURE__ */ jsx6(ToolTipWrapper_default, { label: `View ${leftLabel}`, children: /* @__PURE__ */ jsx6(
        "button",
        {
          onClick: () => setShowSecurityPolicy(true),
          className: "text-sm hover:text-red-600 transition-colors",
          children: leftLabel
        }
      ) }) }),
      /* @__PURE__ */ jsxs6("div", { className: "justify-self-center flex items-center gap-2", children: [
        /* @__PURE__ */ jsx6(
          Image,
          {
            src: avatarSrc,
            alt: name,
            width: 32,
            height: 32,
            className: "rounded-full"
          }
        ),
        /* @__PURE__ */ jsx6(ToolTipWrapper_default, { label: "Social Page", children: /* @__PURE__ */ jsxs6(
          "a",
          {
            href: socialHref,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-sm hover:text-red-600 transition-colors",
            children: [
              name,
              " \xA9 ",
              year
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx6("div", { className: "justify-self-end", children: /* @__PURE__ */ jsxs6("div", { className: "flex flex-col sm:flex-row items-center gap-2", children: [
        /* @__PURE__ */ jsx6(ToolTipWrapper_default, { label: "Portfolio", children: /* @__PURE__ */ jsx6("div", { className: "flex gap-4", children: links.slice(0, 2).map((link) => /* @__PURE__ */ jsx6(
          "a",
          {
            href: link.href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-red-600 transition-colors",
            children: link.label
          },
          link.href
        )) }) }),
        /* @__PURE__ */ jsx6("span", { className: "hidden sm:block text-gray-600", children: "|" }),
        links[2] && /* @__PURE__ */ jsx6(ToolTipWrapper_default, { label: "Social Page", children: /* @__PURE__ */ jsx6(
          "a",
          {
            href: links[2].href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-red-600 transition-colors",
            children: links[2].label
          }
        ) })
      ] }) })
    ] }) }),
    showSecurityPolicy && /* @__PURE__ */ jsx6(SecurityPolicyModal, { onClose: () => setShowSecurityPolicy(false) })
  ] });
};
var Footer_default = Footer;
export {
  ContactFormModal,
  ExternalLinkHandler,
  Footer_default as Footer,
  PDFModalViewer_default as PDFModalViewer,
  SecurityPolicyModal,
  ToolTipWrapper_default as TooltipWrapper,
  useExternalLink
};
//# sourceMappingURL=index.js.map