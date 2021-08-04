import { OPasswordApis } from '@xingzhi2107/opassword-js-sdk';

const authToken = localStorage.getItem('AUTH_TOKEN');
const apiHost = 'http://localhost:3001'; // TODO: 通过env配置

export const passwordApis = new OPasswordApis(apiHost, authToken);
