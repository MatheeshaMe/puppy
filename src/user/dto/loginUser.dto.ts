import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
