import * as NodeStorage from 'node-persist';
import { UserData, PasswordInfoPlainData } from '@xingzhi2107/opassword-js-sdk';
import * as fs from 'fs';

const DIR = `${process.env.HOME}/.config/opass/`;
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

const storage = NodeStorage.create({
  dir: DIR,
});

const Keys = {
  AuthToken: 'AUTH_TOKEN',
  CurrUser: 'CURR_USER',
  PasswordInfos: 'PASSWORD_INFOS',
  GpgKey: 'GPG_KEY',
};

export const Storage = {
  async getAuthToken(): Promise<string> {
    const val = await storage.getItem(Keys.AuthToken);
    return (val || '') as string;
  },
  async setAuthToken(authToken: string) {
    await storage.setItem(Keys.AuthToken, authToken);
  },
  async getCurrUser(): Promise<UserData | null> {
    const val = await storage.getItem(Keys.CurrUser);
    if (val) {
      return val as UserData;
    } else {
      return null;
    }
  },
  async setCurrUser(user: UserData) {
    await storage.setItem(Keys.CurrUser, user);
  },
  async getPasswordInfos(): Promise<Record<string, PasswordInfoPlainData>> {
    const val = await storage.getItem(Keys.PasswordInfos);
    if (val) {
      return val as Record<string, PasswordInfoPlainData>;
    } else {
      return {};
    }
  },
  async setPasswordInfos(infos: Record<string, PasswordInfoPlainData>) {
    await storage.setItem(Keys.PasswordInfos, infos);
  },
  async getGpgKey(): Promise<string> {
    const val = await storage.getItem(Keys.GpgKey);
    return (val || '') as string;
  },
  async setGpgKey(key: string) {
    await storage.setItem(Keys.GpgKey, key);
  },
};
