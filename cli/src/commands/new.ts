import { Command } from '@oclif/command';
import { getApiClient } from '../api';
import { Storage } from '../storage';
import { Console } from '../console';
import { enquirer } from '../libs/enquirer';
import { checkAuth } from '../auth';
import { CreatePasswordInfoDto } from 'opass-js-sdk/src/apis/server-types/password-info/password-info.dto';
import { Utils } from '../utils';
import { getLogger } from '../logger';

const logger = getLogger('new');

export default class New extends Command {
  static description = 'new password info';

  static examples = [
    `$ opass new
`,
  ];

  static flags = {};

  static args = [];

  async run() {
    this.parse(New);
    await checkAuth();
    const gpgKey = await Storage.getGpgKey();
    if (!gpgKey) {
      Console.failed('Please config gpg key first.');
      process.exit(-1);
    }
    const apis = await getApiClient();
    const prompt = new enquirer.Form({
      name: 'passwordInfo',
      message: 'Please enter new password info: ',
      choices: [
        { name: 'name', message: 'Title', initial: '' },
        { name: 'account', message: 'Email/phone/account', initial: '' },
        {
          name: 'password',
          message: 'Password',
          initial: '',
          type: 'password',
        },
        {
          name: 'webSite',
          message: 'Web Site',
          initial: 'https://www.',
        },
        {
          name: 'note',
          message: 'Note',
        },
      ],
    });
    const promptRes: any = await prompt.run();
    logger('prompt res', 'log', promptRes);

    const encryptedPassword = await Utils.encryptText(
      promptRes.password.trim(),
      gpgKey,
    );
    logger(`encrypted password with '${gpgKey}' key: ${encryptedPassword}`);

    const dto: CreatePasswordInfoDto = {
      name: promptRes.name.trim(),
      account: promptRes.account.trim(),
      encryptedPassword: encryptedPassword.trim(),
      webSite: promptRes.webSite.trim(),
      note: promptRes.note.trim(),
    };
    const res = await apis.createPasswordInfo(dto);
    if (res.errcode === 0) {
      const newPasswordInfo = res.data.passwordInfo;
      const passwordInfos = await Storage.getPasswordInfos();
      passwordInfos[newPasswordInfo.id] = newPasswordInfo;
      await Storage.setPasswordInfos(passwordInfos);
      Console.success('Create password info success');
    } else {
      Console.failed(`Create password info: ${res.errmsg}`);
    }
  }
}
