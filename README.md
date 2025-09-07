# snex-components
snex-components for web-based projects

## Installation

```bash
npm install @snxethan/snex-components
```

## Usage

To use these components in your project, you need to import the CSS file for proper styling and animations:

```css
/* In your main CSS file (e.g., globals.css or app.css) */
@import '@snxethan/snex-components/dist/index.css';
```

Or import it in your main component file:

```javascript
// In your main component or _app.js/_app.tsx
import '@snxethan/snex-components/dist/index.css';
```

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

- **Footer** - A responsive footer component with links and social media integration
- **ContactFormModal** - A modal for contact forms with validation
- **TooltipWrapper** - A tooltip wrapper component with PDF preview support
- **ExternalLinkHandler** - Handler for external links with warnings
- **PDFModalViewer** - Modal for viewing PDF documents
- **SecurityPolicyModal** - Modal for displaying security policy

## Styling

This package includes custom CSS animations and utility classes that are bundled in `dist/index.css`:
- `.animate-elastic-in` - Elastic entrance animation
- `.animate-elastic-out` - Elastic exit animation
- `.animate-fade-in` - Fade in animation
- `.animate-zoom-rotate` - Zoom and rotate animation
- `.footer-links` - Responsive footer links styling

Make sure to import the `dist/index.css` file to enable these animations and styles.
