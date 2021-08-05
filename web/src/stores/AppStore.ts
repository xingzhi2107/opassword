import { action, makeObservable, observable, reaction } from 'mobx';
import { LocalStorageUtils } from '../utils/LocalStorageUtils';

export class AppStore {
  @observable
  public appName = 'OPassword';

  @observable
  public authToken = LocalStorageUtils.getAuthToken();

  @observable
  public appLoaded = false;

  constructor() {
    makeObservable(this);
    reaction(
      () => this.authToken,
      (authToken) => LocalStorageUtils.saveAuthToken(authToken || ''),
    );
  }

  @action
  public setAuthToken(authToken: string) {
    this.authToken = authToken;
  }

  @action
  public setAppLoaded() {
    this.appLoaded = true;
  }
}

export const appStore = new AppStore();
