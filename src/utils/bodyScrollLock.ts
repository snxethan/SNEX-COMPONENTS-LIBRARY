/**
 * Body scroll lock utility that properly handles multiple modals/overlays
 * Uses a counter to track active locks and only unlocks when all are released
 */

let lockCount = 0;
let originalBodyOverflow: string | null = null;

export const lockBodyScroll = (): void => {
  if (lockCount === 0) {
    // Store original overflow style only on first lock
    originalBodyOverflow = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
};

export const unlockBodyScroll = (): void => {
  lockCount = Math.max(0, lockCount - 1);
  
  if (lockCount === 0) {
    // Only restore scroll when all locks are released
    if (originalBodyOverflow !== null) {
      document.body.style.overflow = originalBodyOverflow;
      originalBodyOverflow = null;
    }
  }
};

/**
 * Force unlock body scroll (use with caution, typically for cleanup)
 */
export const forceUnlockBodyScroll = (): void => {
  lockCount = 0;
  if (originalBodyOverflow !== null) {
    document.body.style.overflow = originalBodyOverflow;
    originalBodyOverflow = null;
  }
};

/**
 * Get current lock count (useful for debugging)
 */
export const getLockCount = (): number => lockCount;