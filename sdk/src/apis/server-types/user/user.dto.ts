export class SignUpByEmailDto {
  readonly email: string;
  readonly password: string;
}
export class LoginByPasswordDto {
  readonly email: string;
  readonly password: string;
}
export class PatchUpdateProfileDto {
  readonly nickname?: string;
  readonly bio?: string;
  readonly profileUrl?: string;
}
