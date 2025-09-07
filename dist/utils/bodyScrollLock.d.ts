/**
 * Body scroll lock utility that properly handles multiple modals/overlays
 * Uses a counter to track active locks and only unlocks when all are released
 */
export declare const lockBodyScroll: () => void;
export declare const unlockBodyScroll: () => void;
/**
 * Force unlock body scroll (use with caution, typically for cleanup)
 */
export declare const forceUnlockBodyScroll: () => void;
/**
 * Get current lock count (useful for debugging)
 */
export declare const getLockCount: () => number;
