import { Command } from '@oclif/command';
import { getApiClient } from '../api';
import { Storage } from '../storage';
import { Console } from '../console';
import { checkAuth } from '../auth';
import { CreatePasswordInfoDto } from '@xingzhi2107/opassword-js-sdk/src/apis/server-types/password-info/password-info.dto';
import { Utils } from '../utils';
import { getLogger } from '../logger';

const logger = getLogger('import');

export default class Import extends Command {
  static description = 'import password infos from json';

  static examples = [
    `$ opass import test.json
`,
  ];

  static flags = {};

  static args = [
    {
      name: 'file',
    },
  ];

  async run() {
    const { args } = this.parse(Import);
    await checkAuth();
    const gpgKey = await Storage.getGpgKey();
    if (!gpgKey) {
      Console.failed('Please config gpg key first.');
      process.exit(-1);
    }
    const apis = await getApiClient();
    const jsonContent = Utils.readFileContent(args.file);
    const infos = JSON.parse(jsonContent);

    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      const encryptedPassword = await Utils.encryptText(info.password, gpgKey);
      const dto: CreatePasswordInfoDto = {
        name: info.name,
        account: info.account,
        encryptedPassword,
        webSite: info.webSite,
        note: info.note,
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
}
