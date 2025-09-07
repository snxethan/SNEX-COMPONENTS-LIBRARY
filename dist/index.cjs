"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ContactFormModal: () => ContactFormModal,
  ExternalLinkHandler: () => ExternalLinkHandler,
  Footer: () => Footer_default,
  PDFModalViewer: () => PDFModalViewer_default,
  SecurityPolicyModal: () => SecurityPolicyModal,
  TooltipWrapper: () => ToolTipWrapper_default,
  useExternalLink: () => useExternalLink
});
module.exports = __toCommonJS(index_exports);

// src/components/ContactFormModal.tsx
var import_react = require("react");
var import_react_dom = require("react-dom");
var import_lucide_react = require("lucide-react");
var import_react_hot_toast = __toESM(require("react-hot-toast"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
function ContactFormModal({ onClose }) {
  const [isAnimatingOut, setIsAnimatingOut] = (0, import_react.useState)(false);
  const [mounted, setMounted] = (0, import_react.useState)(false);
  const [name, setName] = (0, import_react.useState)("");
  const [email, setEmail] = (0, import_react.useState)("");
  const [message, setMessage] = (0, import_react.useState)("");
  const firstFieldRef = (0, import_react.useRef)(null);
  const initiateClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 300);
  };
  (0, import_react.useEffect)(() => {
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
        import_react_hot_toast.default.success("Message sent successfully!");
        onClose();
      } else {
        import_react_hot_toast.default.error(data?.message || "Something went wrong.");
      }
    } catch {
      import_react_hot_toast.default.error("Network error. Please try again later.");
    }
  };
  if (!mounted) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
        onClick: (e) => {
          if (e.target === e.currentTarget) initiateClose();
        },
        "aria-hidden": false,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "contact-modal-title",
            className: `relative bg-[#1a1a1a] text-white border border-[#333] rounded-xl w-full max-w-lg shadow-xl ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between p-4 border-b border-[#333]", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { id: "contact-modal-title", className: "text-xl font-semibold", children: "Contact Me" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: initiateClose,
                    "aria-label": "Close",
                    className: "text-gray-400 hover:text-red-500 transition",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: 20 })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "textarea",
                  {
                    required: true,
                    placeholder: "Your Message",
                    className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444] h-32 focus:outline-none focus:ring-2 focus:ring-red-600",
                    value: message,
                    onChange: (e) => setMessage(e.target.value)
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react2 = require("react");
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ExternalLinkContext = (0, import_react2.createContext)(void 0);
var ExternalLinkHandler = ({ children }) => {
  const [isVisible, setIsVisible] = (0, import_react2.useState)(false);
  const [isAnimatingOut, setIsAnimatingOut] = (0, import_react2.useState)(false);
  const [targetUrl, setTargetUrl] = (0, import_react2.useState)("");
  const [isProfessional, setIsProfessional] = (0, import_react2.useState)(false);
  const continueBtnRef = (0, import_react2.useRef)(null);
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
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
        isVisible && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: "fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in",
            onClick: (e) => {
              if (e.target === e.currentTarget) closeWarning();
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "div",
              {
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "ext-link-title",
                className: `bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-md shadow-xl ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between p-4 border-b border-[#333]", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { id: "ext-link-title", className: "text-xl font-semibold text-white", children: "External Link Notice" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "button",
                      {
                        onClick: closeWarning,
                        "aria-label": "Close",
                        className: "text-gray-400 hover:text-red-500 transition",
                        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.X, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "p-6 text-center", children: [
                    isProfessional ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-gray-300 text-sm mb-2", children: [
                        "You are about to visit a ",
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: "professional platform" }),
                        " or external resource."
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-gray-200 text-sm mb-4", children: "The content on this platform may not reflect my personal views and is owned by a third party." })
                    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-gray-300 text-sm mb-2", children: [
                        "You are about to visit a ",
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: "social platform" }),
                        " or external resource."
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-gray-200 text-sm mb-4", children: "Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity." })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-gray-100 text-sm mb-6", children: [
                      "Please proceed with ",
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: "caution" }),
                      "."
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  const ctx = (0, import_react2.useContext)(ExternalLinkContext);
  if (!ctx) throw new Error("useExternalLink must be used within an ExternalLinkHandler");
  return ctx;
};

// src/components/PDFModalViewer.tsx
var import_react3 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_fa = require("react-icons/fa");
var import_react_dom2 = require("react-dom");
var import_jsx_runtime3 = require("react/jsx-runtime");
var isPdfEmbedSupported = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isMobile = /android|iphone|ipad|mobile/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
  const isMac = /macintosh|mac os x/.test(ua);
  return !(isIOS || isSafari && !isMac || isMobile && !isSafari);
};
var PDFModalViewer = ({ pdfUrl, onClose }) => {
  const [visible, setVisible] = (0, import_react3.useState)(false);
  const [animOut, setAnimOut] = (0, import_react3.useState)(false);
  const [unsupported, setUnsupported] = (0, import_react3.useState)(false);
  const [loading, setLoading] = (0, import_react3.useState)(true);
  const modalRef = (0, import_react3.useRef)(null);
  const openInNewTab = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };
  (0, import_react3.useEffect)(() => {
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
  const containerClasses = (0, import_react3.useMemo)(
    () => `fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-8`,
    []
  );
  if (!pdfUrl || !visible) return null;
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        className: containerClasses,
        onClick: (e) => {
          if (e.target === e.currentTarget) initiateClose();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            ref: modalRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "pdf-modal-title",
            className: `relative bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col ${animOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between p-3 sm:p-4 border-b border-[#333]", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: openInNewTab,
                    "data-focus-initial": true,
                    className: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-600",
                    "aria-label": "Open in new tab",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_fa.FaExternalLinkAlt, { size: 16 }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "hidden sm:inline", children: "Open in new tab" })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { id: "pdf-modal-title", className: "sr-only", children: "PDF Preview" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: initiateClose,
                    "aria-label": "Close preview",
                    className: "text-white hover:text-red-500 transition p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react3.X, { size: 22 })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "relative flex-1 bg-[#1a1a1a]", children: unsupported ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col items-center justify-center h-full text-white text-sm p-6 text-center space-y-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Inline PDF preview isn\u2019t supported on this device/browser." }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: openInNewTab,
                    className: "mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-600",
                    children: "Open PDF in new tab"
                  }
                )
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a1a]", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react3.Loader2, { className: "h-8 w-8 animate-spin text-white" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_react4 = require("react");
var import_lucide_react4 = require("lucide-react");
var import_fa2 = require("react-icons/fa");
var import_jsx_runtime4 = require("react/jsx-runtime");
function SecurityPolicyModal({ onClose }) {
  const [showContact, setShowContact] = (0, import_react4.useState)(false);
  const [isAnimatingOut, setIsAnimatingOut] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#333333] bg-[#222222] p-8 shadow-lg
            ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "button",
                {
                  onClick: handleClose,
                  "aria-label": "Close",
                  className: "absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-600",
                  children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react4.X, { size: 20 })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                "h1",
                {
                  id: "security-policy-title",
                  className: "relative mb-8 text-center text-3xl font-bold text-white",
                  children: [
                    "Security Policy",
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-red-600 to-red-500" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-8", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa2.FaShieldAlt, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-xl font-semibold text-white", children: "Reporting Security Issues" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-gray-300", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "mb-4", children: "If you discover a security vulnerability or have concerns about the website's security, please get in touch immediately. All reports will be investigated promptly." }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                      "button",
                      {
                        onClick: () => setShowContact(true),
                        className: "inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-white transition-all duration-200 ease-out hover:from-red-500 hover:to-red-400 hover:scale-105 active:scale-95",
                        children: "Contact Me"
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa2.FaUserShield, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-xl font-semibold text-white", children: "Data Protection" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2 text-gray-300", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: "This website prioritizes your privacy and data protection:" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("ul", { className: "ml-4 list-inside list-disc space-y-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "No personal information is collected or stored" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "Analytics are anonymized for performance monitoring only" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "No tracking cookies are used without explicit consent" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "Data is transmitted securely using HTTPS" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa2.FaLink, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-xl font-semibold text-white", children: "External Links" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2 text-gray-300", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: "This website includes links to external websites and resources:" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("ul", { className: "ml-4 list-inside list-disc space-y-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "All external links are clearly marked" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "Users are notified before leaving the site" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "Third-party content is reviewed for safety" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "I am not responsible for external website content" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa2.FaCookie, { className: "text-xl text-red-500" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-xl font-semibold text-white", children: "Cookie Policy" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2 text-gray-300", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: "This website uses cookies responsibly:" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("ul", { className: "ml-4 list-inside list-disc space-y-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "Essential cookies for basic functionality only" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "No tracking or analytics cookies without consent" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "Session cookies are removed when you close your browser" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: "You can disable cookies in your browser settings" })
                    ] })
                  ] })
                ] })
              ] })
            ]
          }
        )
      }
    ),
    showContact && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ContactFormModal, { onClose: () => setShowContact(false) })
  ] });
}

// src/components/ToolTipWrapper.tsx
var import_react5 = require("react");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var TooltipWrapper = ({
  label,
  children,
  url,
  fullWidth = false
}) => {
  const [visible, setVisible] = (0, import_react5.useState)(false);
  const [thumbnailLoading, setThumbnailLoading] = (0, import_react5.useState)(false);
  const [thumbnailError, setThumbnailError] = (0, import_react5.useState)(false);
  const timeoutRef = (0, import_react5.useRef)(null);
  const isHovering = (0, import_react5.useRef)(false);
  const isPdf = (0, import_react5.useMemo)(() => url?.toLowerCase().endsWith(".pdf") ?? false, [url]);
  const openWithDelay = (0, import_react5.useCallback)(() => {
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
  const closeNow = (0, import_react5.useCallback)(() => {
    isHovering.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
    setThumbnailLoading(false);
  }, []);
  (0, import_react5.useEffect)(() => () => closeNow(), [closeNow]);
  const handleThumbnailLoad = () => setThumbnailLoading(false);
  const handleThumbnailError = () => {
    setThumbnailLoading(false);
    setThumbnailError(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        visible && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: isPdf ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            role: "tooltip",
            "aria-label": label,
            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[60] w-[240px] max-w-[90vw]\n                         rounded-md border border-[#333] bg-[#1a1a1a] p-2 shadow-xl transition-all\n                         duration-200 ease-out opacity-100 scale-100 animate-elastic-in",
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mb-1 text-xs font-medium text-white", children: label }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "relative w-full h-[260px] overflow-hidden rounded bg-[#111]", children: [
                thumbnailLoading && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-[#111]", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react5.Loader2, { className: "h-6 w-6 animate-spin text-white/70" }) }),
                thumbnailError ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-white/70", children: "Unable to generate preview" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "embed",
                  {
                    src: url,
                    type: "application/pdf",
                    className: "h-full w-full min-h-[260px]",
                    onLoad: handleThumbnailLoad,
                    onError: handleThumbnailError
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between text-xs text-white", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "max-w-[140px] truncate", children: "PDF Document" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-white/70", children: "Preview" })
                ] }) })
              ] })
            ] })
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_react6 = require("react");
var import_image = __toESM(require("next/image"), 1);
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  const [showSecurityPolicy, setShowSecurityPolicy] = (0, import_react6.useState)(false);
  const [loading, setLoading] = (0, import_react6.useState)(true);
  (0, import_react6.useEffect)(() => setLoading(false), []);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("footer", { className: "bg-[#121212] text-gray-400 w-full py-6 px-6", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 items-center gap-4 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "justify-self-start h-5 w-24 bg-[#333] rounded animate-pulse" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "justify-self-center flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-8 h-8 rounded-full bg-[#333] animate-pulse" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-5 w-40 bg-[#333] rounded animate-pulse" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "justify-self-end flex items-center gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-5 w-16 bg-[#333] rounded animate-pulse" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-5 w-24 bg-[#333] rounded animate-pulse" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-5 w-32 bg-[#333] rounded animate-pulse" })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("footer", { className: "bg-[#121212] text-gray-400 w-full py-6 px-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 items-center gap-4 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "justify-self-start", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToolTipWrapper_default, { label: `View ${leftLabel}`, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "button",
        {
          onClick: () => setShowSecurityPolicy(true),
          className: "text-sm hover:text-red-600 transition-colors",
          children: leftLabel
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "justify-self-center flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          import_image.default,
          {
            src: avatarSrc,
            alt: name,
            width: 32,
            height: 32,
            className: "rounded-full"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToolTipWrapper_default, { label: "Social Page", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "justify-self-end", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col sm:flex-row items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToolTipWrapper_default, { label: "Portfolio", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex gap-4", children: links.slice(0, 2).map((link) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "hidden sm:block text-gray-600", children: "|" }),
        links[2] && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToolTipWrapper_default, { label: "Social Page", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    showSecurityPolicy && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SecurityPolicyModal, { onClose: () => setShowSecurityPolicy(false) })
  ] });
};
var Footer_default = Footer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactFormModal,
  ExternalLinkHandler,
  Footer,
  PDFModalViewer,
  SecurityPolicyModal,
  TooltipWrapper,
  useExternalLink
});
//# sourceMappingURL=index.cjs.map