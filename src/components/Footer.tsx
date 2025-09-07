"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import TooltipWrapper from "./ToolTipWrapper"
import SecurityPolicyModal from "./SecurityPolicyModal"

type FooterProps = {
  avatarSrc?: string
  name?: string
  socialHref?: string
  leftLabel?: string // “Security Policy” text, in case you ever localize
  links?: { label: string; href: string }[]
}

const Footer = ({
  avatarSrc = "/images/avatar/snex.png",
  name = "Ethan Townsend",
  socialHref = "https://ethantownsend.dev",
  leftLabel = "Security Policy",
  links = [
    { label: "snex.dev", href: "https://snex.dev" },
    { label: "snxethan.dev", href: "https://snxethan.dev" },
    { label: "ethantownsend.dev", href: "https://ethantownsend.dev" }
  ]
}: FooterProps) => {
  const [showSecurityPolicy, setShowSecurityPolicy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => setLoading(false), [])

  if (loading) {
    return (
      <footer className="bg-[#121212] text-gray-400 w-full py-6 px-6">
        <div className="max-w-8xl mx-auto flex flex-col items-center gap-6">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
            <div className="order-3 lg:order-1 mt-2 lg:mt-0">
              <div className="h-5 w-24 bg-[#333333] rounded animate-pulse" />
            </div>
            <div className="order-1 lg:order-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#333333] animate-pulse" />
              <div className="h-5 w-40 bg-[#333333] rounded animate-pulse" />
            </div>
            <div className="order-2 lg:order-3">
              <div className="footer-links flex flex-col sm:flex-row items-center gap-2">
                <div className="flex gap-4">
                  <div className="h-5 w-16 bg-[#333333] rounded animate-pulse" />
                  <div className="h-5 w-24 bg-[#333333] rounded animate-pulse" />
                </div>
                <span className="hidden sm:block text-gray-600">|</span>
                <div className="h-5 w-32 bg-[#333333] rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#121212] text-gray-400 w-full py-6 px-6">
      <div className="max-w-8xl mx-auto flex flex-col items-center gap-6">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
          {/* Left: Security Policy */}
          <div className="order-3 lg:order-1 mt-2 lg:mt-0">
            <TooltipWrapper label={`View ${leftLabel}`}>
              <button
                onClick={() => setShowSecurityPolicy(true)}
                className="text-sm text-gray-400 hover:text-red-600 transition-colors duration-200"
              >
                {leftLabel}
              </button>
            </TooltipWrapper>
          </div>

          {/* Center: Avatar & Name */}
          <div className="order-1 lg:order-2 flex items-center gap-2">
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
                className="text-sm text-gray-400 hover:text-red-600 transition-colors duration-200"
              >
                {name} &copy; {year}
              </a>
            </TooltipWrapper>
          </div>

          {/* Right: Domain Links */}
          <div className="order-2 lg:order-3">
            <div className="footer-links flex flex-col sm:flex-row items-center gap-2">
              <TooltipWrapper label="Portfolio">
                <div className="flex gap-4">
                  {links.slice(0, 2).map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-600 transition-colors duration-200"
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
                    className="hover:text-red-600 transition-colors duration-200"
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
  )
}

export default Footer
