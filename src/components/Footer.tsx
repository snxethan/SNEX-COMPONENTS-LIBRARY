"use client";
import { useState, useEffect, type ReactNode } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import TooltipWrapper from "./ToolTipWrapper";
import { useSnexImage } from "../context/UIProvider";

export type FooterSocialLink = {
  label: string;
  url: string;
  tooltip?: string;
  icon?: ReactNode;
  /** Render the hit area square instead of round (matches the LinkedIn glyph). */
  square?: boolean;
};

export type FooterDomainLink = { label: string; href: string };

type FooterProps = {
  avatarSrc?: string;
  avatarAlt?: string;
  name?: string;
  socialHref?: string;
  nameTooltip?: string;
  /** Wraps the avatar in a button when provided — used to open a modal. */
  onAvatarClick?: () => void;
  avatarLabel?: string;
  socialLinks?: FooterSocialLink[];
  links?: FooterDomainLink[];
};

// Shared hover treatment: red tint, lift, and focus parity for keyboard users.
const linkClass =
  "inline-flex items-center hover:text-red-600 transition-all duration-200 ease-out hover:scale-105 active:scale-100 focus-visible:outline-none focus-visible:text-red-500 focus-visible:scale-105";

const iconClass = (square?: boolean) =>
  `inline-flex items-center justify-center ${square ? "rounded-none" : "rounded-full"} p-1 text-gray-400 hover:text-red-600 text-xl transition-all duration-200 ease-out hover:scale-125 active:scale-100 hover:drop-shadow-[0_0_10px_rgba(220,38,38,0.48)] hover:shadow-[0_0_14px_rgba(220,38,38,0.14)] focus-visible:outline-none focus-visible:text-red-500 focus-visible:drop-shadow-[0_0_10px_rgba(220,38,38,0.48)] focus-visible:shadow-[0_0_14px_rgba(220,38,38,0.14)]`;

const DEFAULT_SOCIALS: FooterSocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/snxethan/",
    tooltip: "My LinkedIn",
    icon: <FaLinkedin />,
    square: true,
  },
  {
    label: "GitHub",
    url: "https://github.com/snxethan",
    tooltip: "My GitHub",
    icon: <FaGithub />,
  },
];

const Footer = ({
  avatarSrc = "/images/avatar/snex.png",
  avatarAlt = "Ethan Townsend",
  name = "Ethan Townsend",
  socialHref = "https://ethantownsend.dev",
  nameTooltip = "My Portfolio",
  onAvatarClick,
  avatarLabel = "Open details",
  socialLinks = DEFAULT_SOCIALS,
  links = [
    { label: "snex.dev", href: "https://snex.dev" },
    { label: "snxethan.dev", href: "https://snxethan.dev" },
  ],
}: FooterProps) => {
  const Image = useSnexImage();
  const [loading, setLoading] = useState(true);
  // Defer to the client so the copyright year never mismatches on hydration.
  useEffect(() => setLoading(false), []);

  if (loading) {
    return (
      <footer className="bg-[#121212] text-gray-400 w-full py-6 px-6">
        <div className="max-w-8xl mx-auto flex flex-col items-center gap-6">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
            {/* Left: Social Links Skeleton */}
            <div className="order-3 lg:order-1 mt-2 lg:mt-0">
              <div className="h-5 w-48 bg-[#333333] rounded animate-pulse" />
            </div>

            {/* Center: Logo & Name Skeleton */}
            <div className="order-1 lg:order-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#333333] animate-pulse" />
              <div className="h-5 w-40 bg-[#333333] rounded animate-pulse" />
            </div>

            {/* Right: Domain Links Skeleton */}
            <div className="order-2 lg:order-3">
              <div className="footer-links flex flex-col sm:flex-row items-center gap-2">
                <div className="flex gap-4">
                  <div className="h-5 w-16 bg-[#333333] rounded animate-pulse" />
                  <div className="h-5 w-24 bg-[#333333] rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const avatar = (
    <Image
      src={avatarSrc}
      alt={avatarAlt}
      width={32}
      height={32}
      className="rounded-full transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
    />
  );

  return (
    <footer className="bg-[#121212] text-gray-400 w-full py-6 px-6">
      <div className="max-w-8xl mx-auto flex flex-col items-center gap-6">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
          {/* Left: Social Links */}
          <div className="order-3 lg:order-1 mt-2 lg:mt-0">
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, url, tooltip, icon, square }) => (
                <TooltipWrapper key={label} label={tooltip ?? label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={iconClass(square)}
                  >
                    {icon}
                  </a>
                </TooltipWrapper>
              ))}
            </div>
          </div>

          {/* Center: Logo & Name */}
          <div className="order-1 lg:order-2 flex items-center gap-2">
            {onAvatarClick ? (
              <button
                onClick={onAvatarClick}
                aria-label={avatarLabel}
                className="p-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              >
                {avatar}
              </button>
            ) : (
              avatar
            )}
            <TooltipWrapper label={nameTooltip}>
              <a href={socialHref} className={`${linkClass} text-sm text-gray-400`}>
                {name} &copy; {new Date().getFullYear()}
              </a>
            </TooltipWrapper>
          </div>

          {/* Right: Domain Links */}
          <div className="order-2 lg:order-3">
            <div className="footer-links flex flex-col sm:flex-row items-center gap-2">
              <div className="flex gap-4">
                {links.map((link) => (
                  <a key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
