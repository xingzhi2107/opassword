export interface SignUpByEmailDto {
  email: string;
  password: string;
}
export interface LoginByPasswordDto {
  email: string;
  password: string;
}
export interface PatchUpdateProfileDto {
  nickname?: string;
  bio?: string;
  profileUrl?: string;
}
