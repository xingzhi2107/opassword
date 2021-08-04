import { AuthStore } from './AuthStore';

export const stores = {
  authStore: new AuthStore(),
};

export interface Stores {
  authStore: AuthStore;
}
