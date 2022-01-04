import { Command } from '@oclif/command';
import { Storage } from '../storage';

export default class ViewGpgKey extends Command {
  static description = 'View gpg key';

  static examples = [
    `$ opass view-gpg-key
`,
  ];

  static flags = {};

  static args = [];

  async run() {
    this.parse(ViewGpgKey);
    const key = await Storage.getGpgKey();
    console.log(`Gpg key: ${key}`);
  }
}
