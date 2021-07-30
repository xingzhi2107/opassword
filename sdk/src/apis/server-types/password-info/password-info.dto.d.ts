export declare class CreatePasswordInfoDto {
  readonly name?: string;
  readonly account?: string;
  readonly encryptedPassword: string;
  readonly webSite?: string;
  readonly note?: string;
}
export declare class PatchUpdatePasswordInfoDto {
  readonly id: number;
  readonly name?: string;
  readonly account?: string;
  readonly encryptedPassword?: string;
  readonly webSite?: string;
  readonly note?: string;
}
