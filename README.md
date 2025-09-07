# snex-components

[![npm version](https://badge.fury.io/js/%40snxethan%2Fsnex-components.svg)](https://badge.fury.io/js/%40snxethan%2Fsnex-components)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A modern, TypeScript-ready React component library designed for web applications. This library provides a collection of reusable, accessible UI components with built-in Tailwind CSS styling and animations.

## Features

- **Modern React Components** - Built with React 18+ and TypeScript
- **Tailwind CSS Integration** - Pre-configured with custom animations and utilities
- **Responsive Design** - Mobile-first approach for all components
- **Accessibility** - WCAG compliant components
- **Tree Shakeable** - Import only what you need
- **Easy Integration** - Simple setup with Next.js and other React frameworks

## Requirements

Before installing, make sure your project has these peer dependencies:

- React >= 18.0.0
- React DOM >= 18.0.0
- Next.js >= 13.0.0
- Tailwind CSS >= 3.3.0
- PostCSS >= 8.4.0
- Autoprefixer >= 10.4.0

## Installation

```bash
npm install @snxethan/snex-components
```

## Setup

### 1. Import Styles

Import the CSS file for proper styling and animations:

```css
/* In your main CSS file (e.g., globals.css or app.css) */
@import '@snxethan/snex-components/dist/index.css';
```

Or import it in your main component file:

```javascript
// In your main component or _app.js/_app.tsx
import '@snxethan/snex-components/dist/index.css';
```

### 2. Configure Tailwind CSS

For optimal integration, add the snex-components preset to your Tailwind config:

**For Tailwind CSS v3:**
```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@snxethan/snex-components/tailwind-preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@snxethan/snex-components/dist/**/*.js'
  ],
  // ... your other config
}
```

**For Tailwind CSS v4:**
```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@snxethan/snex-components/tailwind-preset')],
  content: {
    files: [
      './src/**/*.{js,ts,jsx,tsx}',
      '@source ./node_modules/@snxethan/snex-components/dist/**/*.js'
    ]
  },
  // ... your other config
}
```

## Usage

Then import and use the components:

```javascript
import { Footer, ContactFormModal, TooltipWrapper } from '@snxethan/snex-components';
```

## Full Example

```jsx
import React from 'react';
import { 
  Footer, 
  ExternalLinkHandler, 
  useExternalLink, 
  SecurityPolicyModal, 
  ContactFormModal, 
  TooltipWrapper, 
  PDFModalViewer 
} from '@snxethan/snex-components';
import '@snxethan/snex-components/dist/index.css';

function App() {
  const [showSecurityPolicy, setShowSecurityPolicy] = React.useState(false);
  const { handleExternalClick } = useExternalLink();
  
  return (
    <ExternalLinkHandler>
      <div className="min-h-screen bg-gray-900">
        <main className="p-8">
          <TooltipWrapper label="View our security policy">
            <button onClick={() => setShowSecurityPolicy(true)}>
              Security Policy
            </button>
          </TooltipWrapper>
          
          <button onClick={() => handleExternalClick('https://github.com', true)}>
            External Link (Professional)
          </button>
        </main>
        
        <Footer />
        
        {showSecurityPolicy && (
          <SecurityPolicyModal onClose={() => setShowSecurityPolicy(false)} />
        )}
      </div>
    </ExternalLinkHandler>
  );
}
```

## Components

### Core Components

#### **Footer**
A responsive footer component with avatar display, social media integration, and customizable links.

**Props:**
- `avatarSrc?: string` - Avatar image source (default: "/images/avatar/snex.png")
- `name?: string` - Display name (default: "Ethan Townsend")
- `socialHref?: string` - Social media link (default: "https://ethantownsend.dev")
- `leftLabel?: string` - Security policy label (default: "Security Policy")
- `links?: Array<{label: string, href: string}>` - Footer navigation links

#### **ContactFormModal**
A modal component for contact forms with form validation and toast notifications.

**Props:**
- `onClose: () => void` - Callback function when modal is closed

**Features:**
- Form validation for name, email, and message fields
- Keyboard navigation support (Esc to close)
- Smooth animations with elastic entrance/exit effects
- Focus management and accessibility features

#### **TooltipWrapper**
A versatile tooltip wrapper component with PDF preview support.

**Props:**
- `label: string` - Tooltip text to display
- `children: ReactNode` - Content to wrap with tooltip
- `url?: string` - Optional URL for PDF preview functionality
- `fullWidth?: boolean` - Whether to expand tooltip to full width

**Features:**
- PDF thumbnail preview for PDF URLs
- Loading states and error handling
- Hover delay and smooth animations
- Responsive positioning

#### **ExternalLinkHandler & useExternalLink**
A context provider and hook for managing external link warnings with professional/casual modes.

**ExternalLinkHandler Props:**
- `children: ReactNode` - App content to wrap

**useExternalLink Hook Returns:**
- `handleExternalClick: (url: string, isProfessional?: boolean) => void`
- `showWarning: boolean`
- `targetUrl: string`
- `isProfessional: boolean`
- `closeWarning: () => void`

**Features:**
- Warning modal for external links
- Professional/casual presentation modes
- Keyboard navigation and focus management

#### **PDFModalViewer**
A modal component for viewing PDF documents with navigation controls.

**Props:**
- `onClose: () => void` - Callback function when modal is closed
- `url: string` - PDF document URL to display

**Features:**
- Full-screen PDF viewing
- Loading states and error handling
- Keyboard navigation support

#### **SecurityPolicyModal**
A modal component for displaying security policy information.

**Props:**
- `onClose: () => void` - Callback function when modal is closed

**Features:**
- Pre-built security policy content
- Responsive design and smooth animations

## Styling and Animations

This package includes custom CSS animations and utility classes that are bundled in `dist/index.css`:

### Custom Animations
- `.animate-elastic-in` - Smooth elastic entrance animation (300ms)
- `.animate-elastic-out` - Smooth elastic exit animation (250ms)
- `.animate-fade-in` - Simple fade in animation
- `.animate-zoom-rotate` - Zoom and rotate animation

### Utility Classes
- `.footer-links` - Responsive footer links styling with proper spacing

### Tailwind Preset
The included Tailwind preset (`tailwind-preset.cjs`) extends your theme with:
- Custom keyframes for elastic animations
- Optimized cubic-bezier timing functions
- Responsive breakpoint utilities

Make sure to import the `dist/index.css` file and configure the Tailwind preset to enable these animations and styles.

## TypeScript Support

This library is built with TypeScript and includes full type definitions. All components are properly typed with comprehensive prop interfaces and return types.

## Development

### Prerequisites
- Node.js >= 16
- npm or yarn

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/snxethan/snex-components.git
cd snex-components
```

2. Install dependencies:
```bash
npm install
```

3. Build the library:
```bash
npm run build
```

### Project Structure
```
src/
├── components/          # React components
│   ├── ContactFormModal.tsx
│   ├── ExternalLinkHandler.tsx
│   ├── Footer.tsx
│   ├── PDFModalViewer.tsx
│   ├── SecurityPolicyModal.tsx
│   └── ToolTipWrapper.tsx
├── index.ts            # Main export file
styles.css              # Global styles and animations
tailwind-preset.cjs     # Tailwind CSS preset
tsup.config.ts         # Build configuration
```

### Building
The library uses [tsup](https://tsup.egoist.dev/) for building with the following outputs:
- ESM and CJS JavaScript bundles
- TypeScript declaration files
- CSS bundle with custom animations

## Author(s)

- [**Ethan Townsend (snxethan)**](https://www.ethantownsend.dev)

## Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/snxethan/snex-components/issues).
