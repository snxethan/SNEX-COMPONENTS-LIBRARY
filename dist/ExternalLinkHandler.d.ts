import { ReactNode } from "react";
interface ExternalLinkContextType {
    showWarning: boolean;
    targetUrl: string;
    isProfessional: boolean;
    handleExternalClick: (url: string, isProfessional?: boolean) => void;
    closeWarning: () => void;
}
export declare const ExternalLinkHandler: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useExternalLink: () => ExternalLinkContextType;
export {};
