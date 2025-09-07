"use client"
import React, { useState, useEffect } from "react"
import TooltipWrapper from "./ToolTipWrapper"
import SecurityPolicyModal from "./SecurityPolicyModal"

const Footer = () => {
  const [showSecurityPolicy, setShowSecurityPolicy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            {/* Left: Security Policy */}
            <div className="footer-left">
              {!loading ? (
                <TooltipWrapper label="View Security Policy">
                  <button 
                    onClick={() => setShowSecurityPolicy(true)}
                    className="footer-link-button"
                  >
                    Security Policy
                  </button>
                </TooltipWrapper>
              ) : (
                <div className="skeleton skeleton-sm" />
              )}
            </div>

            {/* Center: Logo & Name */}
            <div className="footer-center">
              {!loading ? (
                <>
                  <img
                    src="/images/avatar/snex.png"
                    alt="Ethan Townsend"
                    width={32}
                    height={32}
                    className="avatar"
                  />
                  <TooltipWrapper label="Social Page">
                    <a href="https://ethantownsend.dev" className="footer-link-button name-link">
                      Ethan Townsend &copy; {new Date().getFullYear()}
                    </a>
                  </TooltipWrapper>
                </>
              ) : (
                <>
                  <div className="skeleton skeleton-circle" />
                  <div className="skeleton skeleton-md" />
                </>
              )}
            </div>

            {/* Right: Domain Links */}
            <div className="footer-right">
              {!loading ? (
                <div className="footer-links">
                  <TooltipWrapper label="Portfolio">
                    <div className="domain-links">
                      <a href="https://snex.dev" className="footer-link-button">
                        snex.dev    
                      </a>
                      <a href="https://snxethan.dev" className="footer-link-button">
                        snxethan.dev
                      </a>
                    </div>
                  </TooltipWrapper>
                  <span className="divider">|</span>
                  <TooltipWrapper label="Social Page">
                    <a href="https://ethantownsend.dev" className="footer-link-button">
                      ethantownsend.dev
                    </a>
                  </TooltipWrapper>
                </div>
              ) : (
                <>
                  <div className="skeleton skeleton-sm" />
                  <div className="skeleton skeleton-md" />
                </>
              )}
            </div>
          </div>
        </div>
        {showSecurityPolicy && <SecurityPolicyModal onClose={() => setShowSecurityPolicy(false)} />}
      </footer>

      {/* Inline CSS */}
      <style>{`
        .footer {
          background: #121212;
          color: #9ca3af;
          width: 100%;
          padding: 1.5rem;
        }
        .footer-container {
          max-width: 96rem; /* same as Tailwind's max-w-8xl */
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }
        .footer-row {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem; /* same as gap-4 */
          text-align: center;
          font-size: 0.875rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .footer-row {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
        .footer-left,
        .footer-right,
        .footer-center {
          display: flex;
          align-items: center;
        }

        .footer-center {
          gap: 0.5rem; /* gap-2 */
        }
        .footer-center a.name-link {
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }

        .footer-right {
          flex-direction: column;
          gap: 0.5rem; /* gap-2 */
        }
        @media (min-width: 640px) {
          .footer-right {
            flex-direction: row;
          }
        }
        .footer-links {
          display: flex;
          flex-direction: row;
          gap: 0.5rem; /* sm:flex-row gap-2 */
          align-items: center;
          justify-content: center;
        }
        .domain-links {
          display: flex;
          gap: 1rem; /* flex gap-4 */
        }
        .divider {
          display: none;
          color: #4b5563;
        }
        @media (min-width: 640px) {
          .divider {
            display: inline-block;
          }
        }

        .footer-link-button {
          font-size: 0.875rem;
          color: #9ca3af;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .footer-link-button:hover {
          color: #dc2626;
        }

        .avatar {
          border-radius: 50%;
          display: inline-block;
          width: 32px;
          height: 32px;
          object-fit: cover;
        }

        .skeleton {
          background: #333;
          border-radius: 0.25rem;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .skeleton-circle {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
        .skeleton-sm {
          width: 6rem;
          height: 1.25rem;
        }
        .skeleton-md {
          width: 10rem;
          height: 1.25rem;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default Footer
