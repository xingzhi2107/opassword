import { Storage } from './storage';
import { Console } from './console';
import { UserData } from '@xingzhi2107/opassword-js-sdk';

export async function checkAuth(): Promise<UserData> {
  const currUser = await Storage.getCurrUser();
  if (!currUser) {
    Console.failed('Please run `opass login` to login first');
    process.exit(-1);
  } else {
    return currUser;
  }
}
