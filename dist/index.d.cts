import * as react from 'react';
import { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface Props {
    onClose: () => void;
}
declare function ContactFormModal({ onClose }: Props): react.ReactPortal | null;

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

interface PDFModalViewerProps {
    pdfUrl: string | null;
    onClose: () => void;
}
declare const PDFModalViewer: React.FC<PDFModalViewerProps>;

interface SecurityPolicyModalProps {
    onClose: () => void;
}
declare function SecurityPolicyModal({ onClose }: SecurityPolicyModalProps): react_jsx_runtime.JSX.Element;

interface PdfThumbnailTooltipProps {
    label: string;
    children: ReactNode;
    url?: string;
    fullWidth?: boolean;
}
declare const TooltipWrapper: ({ label, children, url, fullWidth }: PdfThumbnailTooltipProps) => react_jsx_runtime.JSX.Element;

type FooterProps = {
    avatarSrc?: string;
    name?: string;
    socialHref?: string;
    leftLabel?: string;
    links?: {
        label: string;
        href: string;
    }[];
};
declare const Footer: ({ avatarSrc, name, socialHref, leftLabel, links }: FooterProps) => react_jsx_runtime.JSX.Element;

export { ContactFormModal, ExternalLinkHandler, Footer, PDFModalViewer, SecurityPolicyModal, TooltipWrapper, useExternalLink };
