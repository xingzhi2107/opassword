import { Command, flags } from '@oclif/command';
import { getApiClient } from '../api';
import { Storage } from '../storage';
import { Console } from '../console';
import { enquirer } from '../libs/enquirer';
import { checkAuth } from '../auth';
import { getLogger } from '../logger';
import { Utils } from '../utils';

const logger = getLogger('search');

export default class Search extends Command {
  static description = 'search password info';

  static examples = [
    `$ opass search google
`,
  ];

  static flags = {
    cache: flags.boolean({
      char: 'c',
      description: 'use cache',
      default: true,
      allowNo: true,
    }),
  };

  static args = [
    {
      name: 'keyword',
    },
  ];

  async run() {
    const { flags } = this.parse(Search);
    await checkAuth();
    const gpgKey = await Storage.getGpgKey();
    if (!gpgKey) {
      Console.failed('Please config gpg key first.');
      process.exit(-1);
    }
    const apis = await getApiClient();
    if (!flags.cache) {
      let page = 1;
      let passwordInfos: any[] = [];
      while (page > 0) {
        const res = await apis.fetchPasswordInfoIds({
          'per-page': 100,
          page,
        });
        if (res.errcode === 0) {
          const ids = res.data.ids;
          if (ids.length === 0) {
            page = -1;
            continue;
          } else {
            page = page + 1;
          }
          const infoRes = await apis.fetchPasswordInfos({
            ids: res.data.ids,
            cols: [
              'id',
              'name',
              'account',
              'encryptedPassword',
              'webSite',
              'note',
            ],
          });
          if (infoRes.errcode === 0) {
            passwordInfos = [...passwordInfos, ...infoRes.data.items];
          } else {
            page = -1;
            Console.failed(`Load password info failed. ${infoRes.errmsg}`);
            process.exit(-1);
          }
        } else {
          page = -1;
          Console.failed(`Load password info ids failed. ${res.errmsg}`);
          process.exit(-1);
        }
      }
      const mapping = passwordInfos.reduce((rslt, item) => {
        rslt[item.id] = item;
        return rslt;
      }, {});
      await Storage.setPasswordInfos(mapping);
    }
    const passwordInfosMapping = await Storage.getPasswordInfos();
    const passwordInfos = Object.values(passwordInfosMapping);
    const choices = passwordInfos.map((x) => {
      return {
        message: `Title:   ${x.name}\nAccount: ${x.account}\nURL:     ${x.webSite}\n`,
        value: x.id,
      };
    });
    const prompt = new enquirer.AutoComplete({
      name: 'result',
      message: 'Pick password info',
      limit: 10,
      initial: 0,
      choices: choices,
    });

    const selectedId = await prompt.run();
    logger('pick password id', 'log', selectedId);

    const passwordInfo = passwordInfosMapping[selectedId];
    logger('pick password info', 'log', passwordInfo);

    const password = await Utils.decryptText(passwordInfo.encryptedPassword);
    const displayObj: any = { ...passwordInfo };
    delete displayObj.encryptedPassword;
    console.log(JSON.stringify(displayObj, null, 4));
    await Utils.clipboardWriteText(password);
    Console.success('Copy password to clipboard');
  }
}
