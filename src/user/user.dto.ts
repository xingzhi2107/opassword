import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SignUpByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class LoginByPasswordDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class PatchUpdateProfileDto {
  @IsOptional()
  readonly nickname?: string;

  @IsOptional()
  readonly bio?: string;

  @IsOptional()
  readonly profileUrl?: string;
}
