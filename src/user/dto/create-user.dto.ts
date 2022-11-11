import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsNotEmpty()
  @IsString()
  address: string;

  // @IsNotEmpty()
  @IsString()
  photo: string;

  // @IsNotEmpty()
  @IsString()
  accounts: string;

  @IsNotEmpty()
  password: string;
  
  @IsBoolean()
  isAdmin:boolean
}
