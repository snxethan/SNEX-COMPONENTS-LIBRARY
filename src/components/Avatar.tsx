"use client";

import { useEffect, useState } from "react";
import { useSnexImage } from "../context/UIProvider";

/**
 * A rule matching a calendar date. `month` is 1-12. Rules are evaluated in
 * order, so put narrower ones first.
 */
export type SeasonalAvatarRule = {
  month: number;
  /** Match only on this day of the month. */
  day?: number;
  /** Match days before this day of the month. */
  dayBefore?: number;
  /** Match this day of the month and later. */
  dayFrom?: number;
  src: string;
};

interface AvatarProps {
  /** Shown when no seasonal rule matches. */
  src?: string;
  alt?: string;
  /** Evaluated in order against today's date; first match wins. */
  seasonal?: SeasonalAvatarRule[];
  className?: string;
  size?: number;
}

const DEFAULT_SEASONAL: SeasonalAvatarRule[] = [
  { month: 12, dayBefore: 25, src: "/images/avatar/avatar_christmas.png" },
  { month: 12, dayFrom: 25, src: "/images/avatar/avatar_christmas2.gif" },
  { month: 10, src: "/images/avatar/avatar_halloween.png" },
  { month: 8, day: 11, src: "/images/avatar/avatar_birthday.png" },
  { month: 7, src: "/images/avatar/avatar_summer.png" },
  { month: 6, src: "/images/avatar/avatar_pride.png" },
];

const matches = (rule: SeasonalAvatarRule, month: number, day: number) => {
  if (rule.month !== month) return false;
  if (rule.day !== undefined) return day === rule.day;
  if (rule.dayBefore !== undefined) return day < rule.dayBefore;
  if (rule.dayFrom !== undefined) return day >= rule.dayFrom;
  return true;
};

const resolveAvatar = (rules: SeasonalAvatarRule[], fallback: string): string => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return rules.find((r) => matches(r, month, day))?.src ?? fallback;
};

const Avatar = ({
  src = "/images/avatar/avatar.png",
  alt = "Avatar",
  seasonal = DEFAULT_SEASONAL,
  className = "w-full h-full object-cover rounded-full transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105",
  size = 512,
}: AvatarProps) => {
  const Image = useSnexImage();
  // Resolved after mount so the server and first client render agree.
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  useEffect(() => {
    setAvatarSrc(resolveAvatar(seasonal, src));
    // Rules are usually a module-level constant; compare by value so an inline
    // array literal does not re-trigger this on every render.
  }, [src, JSON.stringify(seasonal)]);

  if (!avatarSrc) {
    return <div className="w-full h-full rounded-full bg-[#333333] animate-pulse" />;
  }

  return (
    <Image
      src={avatarSrc}
      alt={alt}
      width={size}
      height={size}
      className={className}
      unoptimized={avatarSrc.endsWith(".gif")}
    />
  );
};

export default Avatar;
