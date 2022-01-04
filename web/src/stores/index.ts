import { appStore } from './AppStore';
import { authStore } from './AuthStore';
import { gpgStore } from './GPGStore';

export const stores = {
  authStore,
  appStore,
  gpgStore,
};

(window as any)._____APP_STATE_____ = stores;

export type Stores = typeof stores;
