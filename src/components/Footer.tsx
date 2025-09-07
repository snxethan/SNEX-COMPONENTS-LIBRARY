"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import TooltipWrapper from "./ToolTipWrapper";
import SecurityPolicyModal from "./SecurityPolicyModal";

type FooterProps = {
  avatarSrc?: string;
  name?: string;
  socialHref?: string;
  leftLabel?: string;
  links?: { label: string; href: string }[];
};

const Footer = ({
  avatarSrc = "/images/avatar/snex.png",
  name = "Ethan Townsend",
  socialHref = "https://ethantownsend.dev",
  leftLabel = "Security Policy",
  links = [
    { label: "snex.dev", href: "https://snex.dev" },
    { label: "snxethan.dev", href: "https://snxethan.dev" },
    { label: "ethantownsend.dev", href: "https://ethantownsend.dev" },
  ],
}: FooterProps) => {
  const [showSecurityPolicy, setShowSecurityPolicy] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  const year = new Date().getFullYear();

  // skeleton
  if (loading) {
    return (
      <footer className="bg-[#121212] text-gray-400 w-full py-6 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 text-sm">
            <div className="justify-self-start h-5 w-24 bg-[#333] rounded animate-pulse" />
            <div className="justify-self-center flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#333] animate-pulse" />
              <div className="h-5 w-40 bg-[#333] rounded animate-pulse" />
            </div>
            <div className="justify-self-end flex items-center gap-4">
              <div className="h-5 w-16 bg-[#333] rounded animate-pulse" />
              <div className="h-5 w-24 bg-[#333] rounded animate-pulse" />
              <div className="h-5 w-32 bg-[#333] rounded animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#121212] text-gray-400 w-full py-6 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 text-sm">
          {/* Left: Security Policy */}
          <div className="justify-self-start">
            <TooltipWrapper label={`View ${leftLabel}`}>
              <button
                onClick={() => setShowSecurityPolicy(true)}
                className="text-sm hover:text-red-600 transition-colors"
              >
                {leftLabel}
              </button>
            </TooltipWrapper>
          </div>

          {/* Center: Avatar & Name */}
          <div className="justify-self-center flex items-center gap-2">
            <Image
              src={avatarSrc}
              alt={name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <TooltipWrapper label="Social Page">
              <a
                href={socialHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-red-600 transition-colors"
              >
                {name} &copy; {year}
              </a>
            </TooltipWrapper>
          </div>

          {/* Right: Domain Links */}
          <div className="justify-self-end">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <TooltipWrapper label="Portfolio">
                <div className="flex gap-4">
                  {links.slice(0, 2).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </TooltipWrapper>
              <span className="hidden sm:block text-gray-600">|</span>
              {links[2] && (
                <TooltipWrapper label="Social Page">
                  <a
                    href={links[2].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 transition-colors"
                  >
                    {links[2].label}
                  </a>
                </TooltipWrapper>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSecurityPolicy && (
        <SecurityPolicyModal onClose={() => setShowSecurityPolicy(false)} />
      )}
    </footer>
  );
};

export default Footer;
