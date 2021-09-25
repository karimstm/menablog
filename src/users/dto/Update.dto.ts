import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  readonly username: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  readonly bio: string;

  readonly image: string;

  readonly password: string;
}
