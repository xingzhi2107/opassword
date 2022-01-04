import * as openpgp from 'openpgp';

export const GPGUtils = {
  async encryptText(publicKeyArmored: string, text: string): Promise<string> {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const result = await openpgp.encrypt({
      message: await openpgp.createMessage({ text }), // input as Message object
      encryptionKeys: publicKey,
    });
    return result;
  },
  async decryptText(
    publicKeyArmored: string,
    privateKeyArmored: string,
    passphrase: string,
    encryptedText: string,
  ): Promise<string> {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
      }),
      passphrase,
    });
    const message = await openpgp.readMessage({
      armoredMessage: encryptedText, // parse armored message
    });
    const { data: decrypted } = await openpgp.decrypt({
      message,
      verificationKeys: publicKey, // optional
      decryptionKeys: privateKey,
    });

    return decrypted;
  },
};
