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

// src/Footer.tsx
var import_react4 = require("react");

// src/ToolTipWrapper.tsx
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var TooltipWrapper = ({ label, children, url, fullWidth = false }) => {
  const [visible, setVisible] = (0, import_react.useState)(false);
  const [thumbnailLoading, setThumbnailLoading] = (0, import_react.useState)(false);
  const [thumbnailError, setThumbnailError] = (0, import_react.useState)(false);
  const timeoutRef = (0, import_react.useRef)(null);
  const isHovering = (0, import_react.useRef)(false);
  const isPdf = (0, import_react.useMemo)(() => {
    var _a;
    return (_a = url == null ? void 0 : url.toLowerCase().endsWith(".pdf")) != null ? _a : false;
  }, [url]);
  const handleMouseEnter = (0, import_react.useCallback)(() => {
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
  const handleMouseLeave = (0, import_react.useCallback)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: `relative group ${fullWidth ? "w-full" : "inline-block"}`,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        children,
        visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: isPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            role: "tooltip",
            "aria-label": label,
            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a1a] border border-[#333] rounded-md shadow-xl z-[70] p-2 w-[220px] max-w-[90vw] transition-all duration-200 ease-out opacity-100 scale-100 animate-elastic-in",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-white mb-1 font-medium", children: label }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative w-full h-[260px] bg-[#111] rounded overflow-hidden", children: [
                thumbnailLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-[#111]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Loader2, { className: "h-6 w-6 animate-spin text-white/70" }) }),
                thumbnailError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 flex items-center justify-center text-white/70 text-xs p-2 text-center", children: "Unable to generate preview" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "embed",
                  {
                    src: url,
                    type: "application/pdf",
                    className: "w-full h-full min-h-[260px]",
                    onLoad: handleThumbnailLoad,
                    onError: handleThumbnailError
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between text-xs text-white", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate max-w-[140px]", children: "PDF Document" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-white/70", children: "Preview" })
                ] }) })
              ] })
            ] })
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            role: "tooltip",
            "aria-label": label,
            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-red-600 text-white rounded-md shadow-md z-[70] whitespace-nowrap transition-all duration-200 ease-out opacity-100 scale-100 animate-elastic-in",
            children: label
          }
        ) })
      ]
    }
  );
};
var ToolTipWrapper_default = TooltipWrapper;

// src/SecurityPolicyModal.tsx
var import_react3 = require("react");

// src/ContactFormModal.tsx
var import_react2 = require("react");
var import_react_dom = require("react-dom");
var import_react_hot_toast = __toESM(require("react-hot-toast"));
var import_jsx_runtime2 = require("react/jsx-runtime");
function ContactFormModal({ onClose }) {
  const [isAnimatingOut, setIsAnimatingOut] = (0, import_react2.useState)(false);
  const [name, setName] = (0, import_react2.useState)("");
  const [email, setEmail] = (0, import_react2.useState)("");
  const [message, setMessage] = (0, import_react2.useState)("");
  const [mounted, setMounted] = (0, import_react2.useState)(false);
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
        import_react_hot_toast.default.success("Message sent successfully!");
        onClose();
      } else {
        import_react_hot_toast.default.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      import_react_hot_toast.default.error("Network error. Please try again later.");
    }
  };
  (0, import_react2.useEffect)(() => {
    setMounted(true);
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);
  const close = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 300);
  };
  const modalContent = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm",
      onClick: close,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          className: `bg-[#1e1e1e] text-white border border-[#333] rounded-xl p-6 max-w-md w-full relative ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                onClick: close,
                className: "absolute top-1 right-3 text-3xl text-gray-400 hover:text-red-500",
                children: "\xD7 "
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-xl font-semibold mb-4", children: "Contact Me" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "textarea",
                {
                  required: true,
                  placeholder: "Your Message",
                  className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444] h-32",
                  value: message,
                  onChange: (e) => setMessage(e.target.value)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  return (0, import_react_dom.createPortal)(modalContent, document.body);
}

// src/SecurityPolicyModal.tsx
var import_fa = require("react-icons/fa");
var import_jsx_runtime3 = require("react/jsx-runtime");
function SecurityPolicyModal({ onClose }) {
  const [showContact, setShowContact] = (0, import_react3.useState)(false);
  const [isAnimatingOut, setIsAnimatingOut] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in",
      onClick: (e) => {
        if (e.target === e.currentTarget) handleClose();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `bg-[#222222] rounded-xl border border-[#333333] shadow-lg p-8 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  onClick: handleClose,
                  className: "absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors",
                  "aria-label": "Close",
                  children: "\xD7"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h1", { className: "text-3xl font-bold text-white mb-8 relative text-center", children: [
                "Security Policy",
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "absolute bottom-[-8px] left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-8", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_fa.FaShieldAlt, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-xl font-semibold text-white", children: "Reporting Security Issues" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-gray-300", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mb-4", children: "If you discover a security vulnerability or have concerns about the website's security, please get in touch immediately. All reports will be investigated promptly." }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "button",
                      {
                        onClick: () => setShowContact(true),
                        className: "inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95",
                        children: "Contact Me"
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_fa.FaUserShield, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-xl font-semibold text-white", children: "Data Protection" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-gray-300 space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "This website prioritizes your privacy and data protection:" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", { className: "list-disc list-inside space-y-1 ml-4", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "No personal information is collected or stored" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Analytics are anonymized for performance monitoring only" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "No tracking cookies are used without explicit consent" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Data is transmitted securely using HTTPS" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_fa.FaLink, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-xl font-semibold text-white", children: "External Links" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-gray-300 space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "This website includes links to external websites and resources:" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", { className: "list-disc list-inside space-y-1 ml-4", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "All external links are clearly marked" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Users are notified before leaving the site" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Third-party content is reviewed for safety" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "I am not responsible for external website content" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] hover:border-red-600/50 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_fa.FaCookie, { className: "text-red-500 text-xl" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "text-xl font-semibold text-white", children: "Cookie Policy" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-gray-300 space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "This website uses cookies responsibly:" }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", { className: "list-disc list-inside space-y-1 ml-4", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Essential cookies for basic functionality only" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "No tracking or analytics cookies without consent" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "Session cookies are removed when you close your browser" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: "You can disable cookies in your browser settings" })
                    ] })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        showContact && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ContactFormModal, { onClose: () => setShowContact(false) })
      ]
    }
  );
}

// src/Footer.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Footer = () => {
  const [showSecurityPolicy, setShowSecurityPolicy] = (0, import_react4.useState)(false);
  const [loading, setLoading] = (0, import_react4.useState)(true);
  (0, import_react4.useEffect)(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("footer", { className: "bg-[#121212] text-gray-400 w-full py-6 px-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "max-w-8xl mx-auto flex flex-col items-center gap-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "order-3 lg:order-1 mt-2 lg:mt-0", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-5 w-24 bg-[#333333] rounded animate-pulse" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "order-1 lg:order-2 flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-8 h-8 rounded-full bg-[#333333] animate-pulse" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-5 w-40 bg-[#333333] rounded animate-pulse" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "order-2 lg:order-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "footer-links flex flex-col sm:flex-row items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-5 w-16 bg-[#333333] rounded animate-pulse" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-5 w-24 bg-[#333333] rounded animate-pulse" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "hidden sm:block text-gray-600", children: "|" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-5 w-32 bg-[#333333] rounded animate-pulse" })
      ] }) })
    ] }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "bg-[#121212] text-gray-400 w-full py-6 px-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "max-w-8xl mx-auto flex flex-col items-center gap-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "order-3 lg:order-1 mt-2 lg:mt-0", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ToolTipWrapper_default, { label: "View Security Policy", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          onClick: () => setShowSecurityPolicy(true),
          className: "text-sm text-gray-400 hover:text-red-600 transition-colors duration-200",
          children: "Security Policy"
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "order-1 lg:order-2 flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "img",
          {
            src: "/images/avatar/snex.png",
            alt: "Ethan Townsend",
            width: 32,
            height: 32,
            className: "rounded-full",
            style: { display: "block" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ToolTipWrapper_default, { label: "Social Page", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("a", { href: "https://ethantownsend.dev", className: "text-sm text-gray-400 hover:text-red-600 transition-colors duration-200", children: [
          "Ethan Townsend \xA9 ",
          (/* @__PURE__ */ new Date()).getFullYear()
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "order-2 lg:order-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "footer-links flex flex-col sm:flex-row items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ToolTipWrapper_default, { label: "Portfolio", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { href: "https://snex.dev", className: "hover:text-red-600 transition-colors duration-200", children: "snex.dev" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { href: "https://snxethan.dev", className: "hover:text-red-600 transition-colors duration-200", children: "snxethan.dev" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "hidden sm:block text-gray-600", children: "|" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ToolTipWrapper_default, { label: "Social Page", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { href: "https://ethantownsend.dev", className: "hover:text-red-600 transition-colors duration-200", children: "ethantownsend.dev" }) })
      ] }) })
    ] }) }),
    showSecurityPolicy && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SecurityPolicyModal, { onClose: () => setShowSecurityPolicy(false) })
  ] });
};
var Footer_default = Footer;

// src/ExternalLinkHandler.tsx
var import_react5 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var ExternalLinkContext = (0, import_react5.createContext)(
  void 0
);
var ExternalLinkHandler = ({ children }) => {
  const [isVisible, setIsVisible] = (0, import_react5.useState)(false);
  const [isAnimatingOut, setIsAnimatingOut] = (0, import_react5.useState)(false);
  const [targetUrl, setTargetUrl] = (0, import_react5.useState)("");
  const [isProfessional, setIsProfessional] = (0, import_react5.useState)(false);
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
  (0, import_react5.useEffect)(() => {
    if (isVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        isVisible && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: "fixed inset-0 z-[80] flex items-center justify-center backdrop-blur-sm bg-black/40 animate-fade-in p-4",
            onClick: closeWarning,
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
              "div",
              {
                className: `bg-[#1a1a1a] border border-[#333] rounded-xl p-6 max-w-md w-full text-center relative ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "button",
                    {
                      onClick: closeWarning,
                      "aria-label": "Close",
                      className: "absolute top-1 right-3 text-gray-400 hover:text-red-500 text-4xl",
                      children: "\xD7"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-xl font-semibold text-white mb-2", children: "External Link Notice" }),
                  isProfessional ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-gray-300 text-sm mb-4", children: [
                      "You are about to visit a ",
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: "professional platform" }),
                      " or external resource."
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-gray-200 text-sm mb-4", children: "The content on this platform may not reflect my personal views and is owned by a third party." })
                  ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-gray-300 text-sm mb-4", children: [
                      "You are about to visit a ",
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: "social platform" }),
                      " or external resource."
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-gray-200 text-sm mb-4", children: "Please note that the content on this platform does not reflect my professional identity or represent me in any official capacity." })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-gray-100 text-sm mb-4", children: [
                    "Please proceed with ",
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: "caution" }),
                    "."
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex justify-center gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
  const context = (0, import_react5.useContext)(ExternalLinkContext);
  if (!context) {
    throw new Error("useExternalLink must be used within an ExternalLinkHandler");
  }
  return context;
};

// src/PDFModalViewer.tsx
var import_react6 = require("react");
var import_lucide_react2 = require("lucide-react");
var import_fa2 = require("react-icons/fa");
var import_react_dom2 = __toESM(require("react-dom"));
var import_jsx_runtime6 = require("react/jsx-runtime");
var isPdfSupported = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome/.test(ua);
  const isMobile = /android|iphone|ipad|mobile/.test(ua);
  return !(isIOS || isSafari || isMobile);
};
var PDFModalViewer = ({ pdfUrl, onClose }) => {
  const [isVisible, setIsVisible] = (0, import_react6.useState)(false);
  const [isAnimatingOut, setIsAnimatingOut] = (0, import_react6.useState)(false);
  const [isUnsupported, setIsUnsupported] = (0, import_react6.useState)(false);
  const [isLoading, setIsLoading] = (0, import_react6.useState)(true);
  (0, import_react6.useEffect)(() => {
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
  return import_react_dom2.default.createPortal(
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "div",
      {
        className: "fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-16",
        onClick: (e) => {
          if (e.target === e.currentTarget) initiateClose();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "div",
          {
            className: `relative bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-xl overflow-hidden flex flex-col ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-between p-3 sm:p-4 border-b border-[#333]", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                  "button",
                  {
                    onClick: () => window.open(pdfUrl || "", "_blank"),
                    className: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
                    "aria-label": "Download or open in new tab",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_fa2.FaExternalLinkAlt, { size: 16 }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "hidden sm:inline", children: "Open in new tab" })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "button",
                  {
                    onClick: initiateClose,
                    "aria-label": "Close Preview",
                    className: "text-white hover:text-red-500 transition p-1 rounded-full",
                    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.X, { size: 24 })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex-1 overflow-auto relative bg-[#1a1a1a]", children: isUnsupported ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col items-center justify-center h-full text-white text-sm p-6 text-center space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "PDF preview is not supported on this device or browser." }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "Please open the PDF in a new tab or download it to view." })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
                isLoading && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.Loader2, { className: "h-8 w-8 animate-spin text-white" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "iframe",
                  {
                    src: pdfUrl,
                    className: "w-full h-full min-h-[500px] border-none",
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
