import { Command } from '@oclif/command';
import { getApiClient } from '../api';
import { Storage } from '../storage';
import { Console } from '../console';
import { prompt } from 'enquirer';

export default class Login extends Command {
  static description = 'login';

  static examples = [
    `$ opass login
`,
  ];

  static flags = {};

  static args = [];

  async run() {
    this.parse(Login);
    const apis = await getApiClient();
    const promptRes: any = await prompt([
      {
        type: 'text',
        name: 'email',
        message: 'Email',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password',
      },
    ]);
    const res = await apis.login({
      email: promptRes.email,
      password: promptRes.password,
    });
    if (res.errcode === 0) {
      res.data.token;
      await Storage.setAuthToken(res.data.token!);
      await Storage.setCurrUser(res.data.user);
      Console.success(`Login success as ${res.data.user.nickname}`);
    } else {
      Console.failed(`Login failed: ${res.errmsg}`);
    }
  }
}
