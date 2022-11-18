import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/schema/user.schema';

export class CreateBlogDTO {
  owner: User;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}

export class UpdateBlogDTO {
  owner: User;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}
