import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const Utils = {
  simpleExec(cmd: string, env = undefined, options = {}) {
    return child_process.execSync(cmd, { encoding: 'utf-8', env, ...options });
  },
  async withTmpFilePath<T = any>(
    actionFn: (tmpPath: string) => Promise<T>,
  ): Promise<T> {
    const TMP_DIR = '/tmp/';
    const tmpFileName = 'opassword-tmp' + uuidv4() + '.txt';
    const tmpFilePath = path.join(TMP_DIR, tmpFileName);

    const actionResult = await actionFn(tmpFilePath);
    Utils.simpleExec(`rm ${tmpFilePath}`);
    return actionResult;
  },
  resolveHome(filepath: string) {
    if (!process.env.HOME) {
      throw Error('Can not resolve HOME path, process.env.HOME is not set.');
    }
    if (filepath[0] === '~') {
      return path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
  },
  readFileContent(filePath: string) {
    filePath = Utils.resolveHome(filePath);
    return fs.readFileSync(filePath, { encoding: 'utf8' });
  },
  writeContentToFile(filePath: string, content: string, options = {}) {
    filePath = Utils.resolveHome(filePath);
    fs.writeFileSync(filePath, content, { encoding: 'utf8', ...options });
  },
  async encryptText(text: string, gpgKey: string): Promise<string> {
    return await Utils.withTmpFilePath(async (tmpPath) => {
      Utils.writeContentToFile(tmpPath, text);
      Utils.simpleExec(
        `gpg  --encrypt --armor --recipient ${gpgKey} ${tmpPath}`,
      );
      const ascPath = tmpPath + '.asc';
      const result = Utils.readFileContent(ascPath);
      Utils.simpleExec(`rm ${ascPath}`);
      return result;
    });
  },
  async decryptText(encryptText: string): Promise<string> {
    return await Utils.withTmpFilePath(async (tmpPath) => {
      Utils.writeContentToFile(tmpPath, encryptText);
      const resultPath = tmpPath + '.result';
      child_process.spawnSync(
        'gpg',
        ['--output', resultPath, '--decrypt', tmpPath],
        {
          encoding: 'utf8',
          stdio: 'inherit',
        },
      );
      const result = Utils.readFileContent(resultPath);
      Utils.simpleExec(`rm ${resultPath}`);
      return result;
    });
  },
  async clipboardWriteText(text: string) {
    await Utils.withTmpFilePath(async (tmpFilePath) => {
      Utils.writeContentToFile(tmpFilePath, text, { encoding: 'utf-8' });
      Utils.simpleExec(`pbcopy < ${tmpFilePath}`);
    });
  },
};
