"use client";

import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * The image contract every component in this library renders through.
 *
 * It is deliberately the intersection of what a plain `<img>` and Next.js'
 * `<Image>` both understand, so a host app can hand us either one.
 */
export type SnexImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Absolutely fill the nearest positioned ancestor (mirrors next/image). */
  fill?: boolean;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  /** Honoured by next/image; ignored by the plain fallback. */
  unoptimized?: boolean;
  onLoad?: () => void;
  onError?: () => void;
};

/**
 * A bare call signature rather than `ComponentType`, on purpose.
 *
 * `ComponentType` drags in `propTypes`, whose variance makes next/image
 * unassignable (its `src` widens to `string | StaticImport`). Comparing only
 * the call signature keeps the prop-level safety we care about while letting a
 * host pass its framework's own image component straight in.
 */
export type SnexImageComponent = (props: SnexImageProps) => ReactNode;

const FILL_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

/** Zero-dependency fallback used when the host app supplies nothing. */
const PlainImage: SnexImageComponent = ({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
  style,
  // `unoptimized` is a next/image concept with no <img> equivalent.
  unoptimized: _unoptimized,
  onLoad,
  onError,
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    width={fill ? undefined : width}
    height={fill ? undefined : height}
    sizes={sizes}
    className={className}
    style={fill ? { ...FILL_STYLE, ...style } : style}
    onLoad={onLoad}
    onError={onError}
  />
);

type SnexUIContextValue = {
  imageComponent: SnexImageComponent;
};

const SnexUIContext = createContext<SnexUIContextValue>({
  imageComponent: PlainImage,
});

export type SnexUIProviderProps = {
  children: ReactNode;
  /**
   * Swap in a framework-native image. Next.js apps should pass `next/image`
   * to keep optimisation; Vite/Electron/CRA apps can omit this entirely.
   */
  imageComponent?: SnexImageComponent;
};

export const SnexUIProvider = ({ children, imageComponent }: SnexUIProviderProps) => {
  const value = useMemo(
    () => ({ imageComponent: imageComponent ?? PlainImage }),
    [imageComponent]
  );
  return <SnexUIContext.Provider value={value}>{children}</SnexUIContext.Provider>;
};

/**
 * Components call this instead of importing an image implementation, so the
 * library never takes a hard dependency on any one framework.
 */
export const useSnexImage = (): SnexImageComponent =>
  useContext(SnexUIContext).imageComponent;

export { PlainImage };
