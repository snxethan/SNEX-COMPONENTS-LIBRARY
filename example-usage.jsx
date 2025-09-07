// Example usage in a Next.js or React app
import React from 'react';
// Import the components and styles
import { Footer, ExternalLinkHandler, useExternalLink, SecurityPolicyModal, ContactFormModal, TooltipWrapper, PDFModalViewer } from '@snxethan/snex-components';
import '@snxethan/snex-components/dist/index.css'; // Important: Import the CSS

function App() {
  const [showSecurityPolicy, setShowSecurityPolicy] = React.useState(false);
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [showPDFViewer, setShowPDFViewer] = React.useState(false);
  
  return (
    <ExternalLinkHandler>
      <div className="min-h-screen bg-gray-900">
        <main className="p-8">
          <h1 className="text-2xl font-bold text-white mb-8">My App</h1>
          
          <div className="flex gap-4 mb-8">
            <TooltipWrapper label="View our security policy">
              <button 
                onClick={() => setShowSecurityPolicy(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Security Policy
              </button>
            </TooltipWrapper>
            
            <TooltipWrapper label="Get in touch with us">
              <button 
                onClick={() => setShowContactForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Contact Us
              </button>
            </TooltipWrapper>
            
            <TooltipWrapper label="View PDF document" url="/example.pdf">
              <button 
                onClick={() => setShowPDFViewer(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                View PDF
              </button>
            </TooltipWrapper>
          </div>
          
          <ExternalLinkExample />
        </main>
        
        <Footer />
        
        {showSecurityPolicy && (
          <SecurityPolicyModal onClose={() => setShowSecurityPolicy(false)} />
        )}
        
        {showContactForm && (
          <ContactFormModal onClose={() => setShowContactForm(false)} />
        )}
        
        {showPDFViewer && (
          <PDFModalViewer 
            pdfUrl="/example.pdf"
            onClose={() => setShowPDFViewer(false)} 
          />
        )}
      </div>
    </ExternalLinkHandler>
  );
}

// Example of using the external link handler
function ExternalLinkExample() {
  const { handleExternalClick } = useExternalLink();
  
  return (
    <div className="text-white">
      <p className="mb-4">External links with warnings:</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleExternalClick('https://github.com', true)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Visit GitHub (Professional)
        </button>
        
        <button
          onClick={() => handleExternalClick('https://twitter.com', false)}
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Visit Twitter (Social)
        </button>
      </div>
    </div>
  );
}

export default App;