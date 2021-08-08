import { action, makeObservable, observable, reaction } from 'mobx';
import { LocalStorageUtils } from '../utils/LocalStorageUtils';
import { GPGUtils } from '../utils/GPGUtils';

export class GPGStore {
  @observable
  public gpgKey = LocalStorageUtils.getGPGKey();

  private passphrase = '';

  constructor() {
    makeObservable(this);
    reaction(
      () => this.gpgKey,
      (gpgKey) => {
        if (gpgKey) {
          LocalStorageUtils.saveGPGKey(gpgKey.publicKey, gpgKey.privateKey);
        } else {
          LocalStorageUtils.removeGPGKey();
        }
      },
    );
  }

  @action
  public setGPGKey(publicKey: string, privateKey: string) {
    this.gpgKey = {
      publicKey,
      privateKey,
    };
  }

  private async requestPassphrase() {
    if (!this.passphrase) {
      // eslint-disable-next-line no-alert
      this.passphrase = window.prompt('密钥密码') || '';
    }
  }

  public async encryptText(text: string): Promise<string | null> {
    if (!this.gpgKey) {
      return null;
    }
    return await GPGUtils.encryptText(this.gpgKey.publicKey, text);
  }

  public async decryptText(encryptedText: string): Promise<string | null> {
    if (!this.gpgKey) {
      return null;
    }
    await this.requestPassphrase();
    return await GPGUtils.decryptText(
      this.gpgKey.publicKey,
      this.gpgKey.privateKey,
      this.passphrase,
      encryptedText,
    );
  }
}

export const gpgStore = new GPGStore();
