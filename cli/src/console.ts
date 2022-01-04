import { red, green } from 'kleur';

export const Console = {
  success(msg: string) {
    console.log(green(msg));
  },
  failed(msg: string) {
    console.log(red(msg));
  },
};
