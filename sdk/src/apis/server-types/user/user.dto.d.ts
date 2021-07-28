export declare class SignUpByEmailDto {
  readonly email: string;
  readonly password: string;
}
export declare class LoginByPasswordDto {
  readonly email: string;
  readonly password: string;
}
export declare class PatchUpdateProfileDto {
  readonly nickname?: string;
  readonly bio?: string;
  readonly profileUrl?: string;
}
