import { ReactNode } from "react";
interface PdfThumbnailTooltipProps {
    label: string;
    children: ReactNode;
    url?: string;
    fullWidth?: boolean;
}
declare const TooltipWrapper: ({ label, children, url, fullWidth }: PdfThumbnailTooltipProps) => any;
export default TooltipWrapper;
