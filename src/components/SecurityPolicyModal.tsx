"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ContactFormModal from "./ContactFormModal";
import { FaShieldAlt, FaUserShield, FaLink, FaCookie } from "react-icons/fa";

interface SecurityPolicyModalProps {
  onClose: () => void;
}

export default function SecurityPolicyModal({ onClose }: SecurityPolicyModalProps) {
  const [showContact, setShowContact] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // lock body scroll & add Esc-to-close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
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
    }, 300); // match animation duration
  };

  return (
    <>
      {/* Base overlay for the Security Policy */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="security-policy-title"
        aria-hidden={showContact}
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-blur-sm
          ${showContact ? "opacity-0 pointer-events-none" : "animate-fade-in bg-black/50"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget && !showContact) handleClose();
        }}
      >
        <div
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#333333] bg-[#222222] p-8 shadow-lg
            ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button (icon, consistent alignment) */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <X size={20} />
          </button>

          <h1
            id="security-policy-title"
            className="relative mb-8 text-center text-3xl font-bold text-white"
          >
            Security Policy
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-red-600 to-red-500" />
          </h1>

          <div className="space-y-8">
            <section className="transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95">
              <div className="mb-4 flex items-center gap-3">
                <FaShieldAlt className="text-xl text-red-500" />
                <h2 className="text-xl font-semibold text-white">Reporting Security Issues</h2>
              </div>
              <div className="text-gray-300">
                <p className="mb-4">
                  If you discover a security vulnerability or have concerns about the website&apos;s
                  security, please get in touch immediately. All reports will be investigated promptly.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowContact(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-white transition-all duration-200 ease-out hover:from-red-500 hover:to-red-400 hover:scale-105 active:scale-95"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </section>

            <section className="transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95">
              <div className="mb-4 flex items-center gap-3">
                <FaUserShield className="text-xl text-red-500" />
                <h2 className="text-xl font-semibold text-white">Data Protection</h2>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>This website prioritizes your privacy and data protection:</p>
                <ul className="ml-4 list-inside list-disc space-y-1">
                  <li>No personal information is collected or stored</li>
                  <li>Analytics are anonymized for performance monitoring only</li>
                  <li>No tracking cookies are used without explicit consent</li>
                  <li>Data is transmitted securely using HTTPS</li>
                </ul>
              </div>
            </section>

            <section className="transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95">
              <div className="mb-4 flex items-center gap-3">
                <FaLink className="text-xl text-red-500" />
                <h2 className="text-xl font-semibold text-white">External Links</h2>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>This website includes links to external websites and resources:</p>
                <ul className="ml-4 list-inside list-disc space-y-1">
                  <li>All external links are clearly marked</li>
                  <li>Users are notified before leaving the site</li>
                  <li>Third-party content is reviewed for safety</li>
                  <li>I am not responsible for external website content</li>
                </ul>
              </div>
            </section>

            <section className="transform rounded-xl border border-[#333333] bg-[#1e1e1e] p-6 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-red-600/50 active:scale-95">
              <div className="mb-4 flex items-center gap-3">
                <FaCookie className="text-xl text-red-500" />
                <h2 className="text-xl font-semibold text-white">Cookie Policy</h2>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>This website uses cookies responsibly:</p>
                <ul className="ml-4 list-inside list-disc space-y-1">
                  <li>Essential cookies for basic functionality only</li>
                  <li>No tracking or analytics cookies without consent</li>
                  <li>Session cookies are removed when you close your browser</li>
                  <li>You can disable cookies in your browser settings</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Contact modal rendered above; policy overlay is hidden & non-interactive while open */}
      {showContact && <ContactFormModal onClose={() => setShowContact(false)} />}
    </>
  );
}
