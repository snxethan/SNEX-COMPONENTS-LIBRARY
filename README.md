# snex-components
snex-components for web-based projects

## Installation

```bash
npm install @snxethan/snex-components
```

## Usage

To use these components in your project, you need to import the required globals.css file for proper styling and animations:

```css
/* In your main CSS file (e.g., globals.css or app.css) */
@import '@snxethan/snex-components/src/globals.css';
```

Or import it in your main component file:

```javascript
// In your main component or _app.js/_app.tsx
import '@snxethan/snex-components/src/globals.css';
```

Then import and use the components:

```javascript
import { Footer, ContactFormModal, TooltipWrapper } from '@snxethan/snex-components';
```

## Components

- **Footer** - A responsive footer component with links and social media integration
- **ContactFormModal** - A modal for contact forms with validation
- **TooltipWrapper** - A tooltip wrapper component with PDF preview support
- **ExternalLinkHandler** - Handler for external links with warnings
- **PDFModalViewer** - Modal for viewing PDF documents
- **SecurityPolicyModal** - Modal for displaying security policy

## Styling

This package includes custom CSS animations and utility classes:
- `.animate-elastic-in` - Elastic entrance animation
- `.animate-elastic-out` - Elastic exit animation
- `.animate-fade-in` - Fade in animation
- `.animate-zoom-rotate` - Zoom and rotate animation
- `.footer-links` - Responsive footer links styling

Make sure to import the globals.css file to enable these animations and styles.
