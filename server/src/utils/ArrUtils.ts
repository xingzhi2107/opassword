export const ArrUtils = {
  uniq<T>(entities: T[], key: string | ((T) => any) | null = null): T[] {
    if (!key) {
      return [...new Set(entities)];
    } else {
      // TODO: 实现这个分支
      throw Error('No impl func');
    }
  },
};
