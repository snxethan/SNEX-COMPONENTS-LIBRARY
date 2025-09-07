import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import react__default, { ReactNode } from 'react';

declare const Footer: () => react_jsx_runtime.JSX.Element;

interface ExternalLinkContextType {
    showWarning: boolean;
    targetUrl: string;
    isProfessional: boolean;
    handleExternalClick: (url: string, isProfessional?: boolean) => void;
    closeWarning: () => void;
}
declare const ExternalLinkHandler: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const useExternalLink: () => ExternalLinkContextType;

interface PdfThumbnailTooltipProps {
    label: string;
    children: ReactNode;
    url?: string;
    fullWidth?: boolean;
}
declare const TooltipWrapper: ({ label, children, url, fullWidth }: PdfThumbnailTooltipProps) => react_jsx_runtime.JSX.Element;

interface Props {
    onClose: () => void;
}
declare function ContactFormModal({ onClose }: Props): react.ReactPortal;

interface PDFModalViewerProps {
    pdfUrl: string | null;
    onClose: () => void;
}
declare const PDFModalViewer: react__default.FC<PDFModalViewerProps>;

interface SecurityPolicyModalProps {
    onClose: () => void;
}
declare function SecurityPolicyModal({ onClose }: SecurityPolicyModalProps): react_jsx_runtime.JSX.Element;

export { ContactFormModal, ExternalLinkHandler, Footer, PDFModalViewer, SecurityPolicyModal, TooltipWrapper, useExternalLink };
