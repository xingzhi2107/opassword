import { appStore } from './AppStore';
import { authStore } from './AuthStore';

export const stores = {
  authStore,
  appStore,
};

(window as any)._____APP_STATE_____ = stores;

export type Stores = typeof stores;
