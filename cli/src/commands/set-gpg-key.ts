import { Command } from '@oclif/command';
import { Storage } from '../storage';

export default class SetGpgKey extends Command {
  static description = 'Set gpg key';

  static examples = [
    `$ opass set-gpg-key 1234
`,
  ];

  static flags = {};

  static args = [
    {
      name: 'key',
    },
  ];

  async run() {
    const { args } = this.parse(SetGpgKey);
    await Storage.setGpgKey(args.key);
  }
}
