"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export default function ContactFormModal({ onClose }: Props) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  // Close helpers
  const initiateClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 300);
  };

  // Mount effects: lock scroll, focus first field, Esc to close
  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") initiateClose();
    };
    window.addEventListener("keydown", onKey);

    // Focus after mount
    setTimeout(() => firstFieldRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({} as any));
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) initiateClose();
      }}
      aria-hidden={false}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className={`relative bg-[#1a1a1a] text-white border border-[#333] rounded-xl w-full max-w-lg shadow-xl ${
          isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <h3 id="contact-modal-title" className="text-xl font-semibold">
            Contact Me
          </h3>
          <button
            onClick={initiateClose}
            aria-label="Close"
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              ref={firstFieldRef}
              type="text"
              required
              placeholder="Your Name"
              className="w-full p-2 bg-[#2a2a2a] rounded border border-[#444] focus:outline-none focus:ring-2 focus:ring-red-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              className="w-full p-2 bg-[#2a2a2a] rounded border border-[#444] focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              required
              placeholder="Your Message"
              className="w-full p-2 bg-[#2a2a2a] rounded border border-[#444] h-32 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
