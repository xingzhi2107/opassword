/* eslint-disable no-unused-vars */
// eslint有bug，这个enum明明被使用了，依然报错
enum LocalStorageKeys {
  AuthToken = 'AUTH_TOKEN',
}
/* eslint-enable no-unused-vars */

export const LocalStorageUtils = {
  saveAuthToken(token: string) {
    const expireAtTs = Math.floor(new Date().getTime()) + 3600 * 24 * 7;
    saveItem(LocalStorageKeys.AuthToken, token, expireAtTs);
  },
  getAuthToken(): string | null {
    return getItem(LocalStorageKeys.AuthToken);
  },
};

function saveItem(
  key: LocalStorageKeys,
  val: any,
  expireAtTs = Number.MAX_SAFE_INTEGER,
): void {
  const payload = {
    val,
    expireAtTs,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

function getItem(key: LocalStorageKeys): any | null {
  const valStr = localStorage.getItem(key) || '';
  try {
    const payload = JSON.parse(valStr);
    const nowTs = Math.floor(new Date().getTime() / 1000);
    if (payload.expireAtTs < nowTs) {
      return null;
    } else {
      return payload.val;
    }
  } catch (e) {
    return null;
  }
}
