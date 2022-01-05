import { observable, action, makeObservable } from 'mobx';
import { passwordApis } from '../ApiClient';
import {
  LoginByPasswordDto,
  SignUpByEmailDto,
  UserData,
} from 'opass-js-sdk';
import { appStore } from './AppStore';

export class AuthStore {
  @observable
  public currentUser: UserData | null = null;

  @observable
  public inProgress = false;

  constructor() {
    makeObservable(this);
  }

  @action
  pullCurrUser = async () => {
    if (this.inProgress) return;

    this.inProgress = true;
    const res = await passwordApis.getUserInfo();
    this.currentUser = res.data.user;
    this.inProgress = false;

    return res;
  };

  @action
  signUp = async (dto: SignUpByEmailDto) => {
    if (this.inProgress) return;
    this.inProgress = true;
    const res = await passwordApis.signUp(dto);
    this.currentUser = res.data.user;
    appStore.setAuthToken(res.data.token || '');
    this.inProgress = false;

    return this.currentUser;
  };

  @action
  login = async (dto: LoginByPasswordDto) => {
    if (this.inProgress) return;
    this.inProgress = true;
    const res = await passwordApis.login(dto);
    appStore.setAuthToken(res.data.token || '');
    this.currentUser = res.data.user;
    this.inProgress = false;

    return this.currentUser;
  };

  @action
  logout = async () => {
    appStore.setAuthToken('');
    this.currentUser = null;
  };
}

export const authStore = new AuthStore();
