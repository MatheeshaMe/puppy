import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
import { User } from '../../user/schema/user.schema';

export class CreateReviewDTO {
  owner: User;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  star: number;
}

export class UpdateReviewDTO {
  owner: User;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  star: number;
}
