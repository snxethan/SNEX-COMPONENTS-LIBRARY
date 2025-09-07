import React from "react";
interface PDFModalViewerProps {
    pdfUrl: string | null;
    onClose: () => void;
}
declare const PDFModalViewer: React.FC<PDFModalViewerProps>;
export default PDFModalViewer;
