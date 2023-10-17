export class CreateUserDto {
  email: string;
  displayName: string;
  refreshToken?: string;
  isAdmin?: boolean;
}
