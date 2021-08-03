export interface CreatePasswordInfoDto {
  name?: string;
  account?: string;
  encryptedPassword: string;
  webSite?: string;
  note?: string;
}
export interface PatchUpdatePasswordInfoDto {
  id: number;
  name?: string;
  account?: string;
  encryptedPassword?: string;
  webSite?: string;
  note?: string;
}
