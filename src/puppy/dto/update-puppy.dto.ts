import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePuppyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  photo: string[];

  @IsArray()
  @IsNotEmpty()
  type: string | PetType;

  @IsString()
  @IsOptional()
  breed?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export enum PetType {
  Dog,
  Cat,
}
