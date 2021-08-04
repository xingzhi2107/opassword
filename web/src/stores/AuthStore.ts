import { observable, action } from 'mobx';
import { passwordApis } from '../ApiClient';
import { LoginByPasswordDto, UserData } from '@xingzhi2107/opassword-js-sdk';

export class AuthStore {
  @observable
  public currentUser: UserData | null = null;

  @observable
  public inProgress = false;

  @action
  pullCurrUser = async () => {
    if (this.inProgress) return;

    this.inProgress = true;
    const res = await passwordApis.getUserInfo();
    this.currentUser = res.data.user;
    this.inProgress = false;

    return this.currentUser;
  };

  @action
  registry = async (dto: LoginByPasswordDto) => {
    if (this.inProgress) return;
    this.inProgress = true;
    const res = await passwordApis.login(dto);
    this.currentUser = res.data.user;
    this.inProgress = false;

    return this.currentUser;
  };

  @action
  login = async (dto: LoginByPasswordDto) => {
    if (this.inProgress) return;
    this.inProgress = true;
    const res = await passwordApis.login(dto);
    this.currentUser = res.data.user;
    this.inProgress = false;

    return this.currentUser;
  };
}
