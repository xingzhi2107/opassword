import { OPasswordApis } from 'opass-js-sdk';
import { LocalStorageUtils } from './utils/LocalStorageUtils';

const authToken = LocalStorageUtils.getAuthToken();
const apiHost = 'http://localhost:3001/api'; // TODO: 通过env配置

export const passwordApis = new OPasswordApis(apiHost, authToken);
