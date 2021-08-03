export class CreatePasswordInfoDto {
  readonly name?: string;
  readonly account?: string;
  readonly encryptedPassword: string;
  readonly webSite?: string;
  readonly note?: string;
}
export class PatchUpdatePasswordInfoDto {
  readonly id: number;
  readonly name?: string;
  readonly account?: string;
  readonly encryptedPassword?: string;
  readonly webSite?: string;
  readonly note?: string;
}
