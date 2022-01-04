const uniqIdMap: any = {};

export const MiscUtils = {
  uniqId(prefix = '') {
    if (uniqIdMap[prefix] === undefined) {
      uniqIdMap[prefix] = 0;
    }
    const curr = uniqIdMap[prefix];
    uniqIdMap[prefix] = curr + 1;

    return prefix + curr.toString();
  },
  setClipboard(text: string) {
    return navigator.clipboard.writeText(text).then(
      function () {
        /* success */
      },
      function () {
        /* failure */
      },
    );
  },
};
