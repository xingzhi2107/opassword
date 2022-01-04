import { OPasswordApis } from '@xingzhi2107/opassword-js-sdk';
import { Storage } from './storage';

const apiHost = 'https://opassword.word-collect.com/api';
// const apiHost = 'http://localhost:3000/api';

let client: OPasswordApis | null = null;
export async function getApiClient(): Promise<OPasswordApis> {
  if (!client) {
    const authToken = await Storage.getAuthToken();
    client = new OPasswordApis(apiHost, authToken);
  }
  return client!;
}
