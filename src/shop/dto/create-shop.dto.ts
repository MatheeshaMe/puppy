import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface ProductType {
  shampoo?: string;
  toy?: string;
  vitamin?: string;
}

export class CreateShopDTO {
  owner: any;

  @IsNotEmpty()
  @IsString()
  productname: string;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  @IsString()
  productphoto: string;

  @IsNotEmpty()
  @IsString()
  producttype: string;
}
