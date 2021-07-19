export const StringUtils = {
  /**
   * Timing Attack safeEqual
   */
  safeEqual(a: string, b: string) {
    let equal = true;
    const length = Math.max(a.length, b.length);
    for (let i = 0; i < length; i++) {
      if (a[i] !== b[i]) {
        equal = false;
      }
    }

    return equal;
  },
};
