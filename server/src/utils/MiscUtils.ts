export const MiscUtils = {
  getValidateMsg(errors: any[]): string {
    const msgs = [];
    errors.forEach((x) =>
      Object.values(x.constraints).forEach((msg) => {
        msgs.push(msg);
      }),
    );

    return msgs.join('; ');
  },
};
