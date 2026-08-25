"use client";

import { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaShieldAlt, FaUserShield, FaLink } from "react-icons/fa";

export type SecurityPolicySection = {
  title: string;
  body: ReactNode;
  icon?: ReactNode;
};

interface SecurityPolicyModalProps {
  onClose: () => void;
  title?: string;
  sections?: SecurityPolicySection[];
}

const DEFAULT_SECTIONS: SecurityPolicySection[] = [
  {
    title: "Privacy & Security",
    icon: <FaShieldAlt className="text-red-500 text-xl" />,
    body: "This site does not collect personal data and only serves content over HTTPS.",
  },
  {
    title: "Data Handling",
    icon: <FaUserShield className="text-red-500 text-xl" />,
    body: "No tracking cookies are used. Any optional analytics are anonymized.",
  },
  {
    title: "External Links",
    icon: <FaLink className="text-red-500 text-xl" />,
    body: "External links open in new tabs so you can easily return here.",
  },
];

export default function SecurityPolicyModal({
  onClose,
  title = "Site Notes",
  sections = DEFAULT_SECTIONS,
}: SecurityPolicyModalProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
    }, 300); // match animation duration
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`bg-[#222222] rounded-xl border border-[#333333] shadow-lg p-8 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
          isAnimatingOut ? "animate-fade-out-down" : "animate-fade-in-up"
        }`}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden" as const,
          WebkitOverflowScrolling: "touch" as const,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold text-white mb-8 relative text-center">
          {title}
          <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500"></span>
        </h1>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="bg-[#1e1e1e] p-6 rounded-xl border border-[#333333]"
            >
              <div className="flex items-center gap-3 mb-3">
                {section.icon}
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-300">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );

  // Only render if mounted (client-side) to avoid hydration issues
  if (!mounted) return null;

  // Use portal to render the modal at the document root level
  return createPortal(modalContent, document.body);
}
