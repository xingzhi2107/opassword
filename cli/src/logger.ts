export function getLogger(label: string) {
  return (
    msg: string,
    level: 'log' | 'warn' | 'error' = 'log',
    ...objs: any[]
  ) => {
    msg = `[${label}]: ${msg}`;
    if (process.env.SHOW_LOG) {
      console[level](msg, ...objs);
    }
  };
}
