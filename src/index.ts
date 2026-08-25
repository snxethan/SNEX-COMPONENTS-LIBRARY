"use client";

// --- framework adapters -----------------------------------------------------
export { SnexUIProvider, PlainImage, useSnexImage } from './context/UIProvider'
export type { SnexImageProps, SnexImageComponent, SnexUIProviderProps } from './context/UIProvider'

// --- utilities --------------------------------------------------------------
export { isPdfPreviewSupported } from './utils/pdfSupport'
export { scrollElementIntoViewWithNavbarOffset } from './utils/scrollWithNavbarOffset'
export { setTimedItem, getTimedItem, removeTimedItem } from './utils/timedStorage'

// --- overlays ---------------------------------------------------------------
export { ExternalLinkHandler, useExternalLink } from './components/ExternalLinkHandler'
export { default as TooltipWrapper } from './components/ToolTipWrapper'
export { default as PDFModalViewer } from './components/PDFModalViewer'
export { default as SecurityPolicyModal } from './components/SecurityPolicyModal'
export type { SecurityPolicySection } from './components/SecurityPolicyModal'
export { default as HealthModal } from './components/HealthModal'
export type { HealthCheckResult } from './components/HealthModal'
export { default as ContactFormModal } from './components/ContactFormModal'

// --- layout & navigation ----------------------------------------------------
export { default as Navbar, DEFAULT_NAVBAR_TABS, DEFAULT_NAVBAR_SUB_ITEMS } from './components/Navbar'
export type { NavbarTab, ContextMenuItem } from './components/Navbar'
export { default as Footer } from './components/Footer'
export type { FooterSocialLink, FooterDomainLink } from './components/Footer'
export { default as Avatar } from './components/Avatar'
export type { SeasonalAvatarRule } from './components/Avatar'

// --- content ----------------------------------------------------------------
export { default as PageTabs } from './components/PageTabs'
export type { PageTabDefinition } from './components/PageTabs'
export { default as Timeline } from './components/Timeline'
export type { TimelineItem, TimelineLinkIcon } from './components/Timeline'
export { default as SearchFilterBar } from './components/SearchFilterBar'
export { default as ScrollArrows } from './components/ScrollArrows'
export { default as ResponsiveCardSkeletonGrid } from './components/ResponsiveCardSkeletonGrid'
