import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePasswordInfoDto {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly account?: string;

  @IsNotEmpty()
  readonly encryptedPassword: string;

  @IsOptional()
  readonly webSite?: string;

  @IsOptional()
  readonly note?: string;
}

export class PatchUpdatePasswordInfoDto {
  @IsNotEmpty()
  readonly id: number;

  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly account?: string;

  @IsOptional()
  readonly encryptedPassword?: string;

  @IsOptional()
  readonly webSite?: string;

  @IsOptional()
  readonly note?: string;
}
