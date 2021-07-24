export const ObjUtils = {
  // TODO: copy Ramda.pick typescript define
  pickAll<T>(cols: string[], obj: T): T {
    const reslt = {} as T;
    cols.forEach((col) => {
      reslt[col] = obj[col];
    });
    return reslt;
  },
};
