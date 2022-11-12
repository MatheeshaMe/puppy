import { CreateShopDTO } from './dto/create-shop.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ShopDocument, Shop } from './schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';

// export type ProductType = "Shampoo" | "Toy" | "Vitamin"

const array: string[] = ['Shampoo', 'Toy', 'Vitamin'];

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Shop') private prodcutSchema: Model<ShopDocument>,
  ) {}

  async createProduct(
    productDTO: CreateShopDTO,
    user: User,
  ): Promise<Shop | HttpException> {
    try {
      const { productname, productPrice, productphoto, producttype } =
        productDTO;
      const { _id } = user;
      // console.log(producttype);

      if (!array.includes(producttype)) {
        return new HttpException(
          'Product type not available yet',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log('going');
      const newProduct = await new this.prodcutSchema({
        owner: _id,
        productname,
        productPrice,
        productphoto,
        producttype,
      });
      return newProduct.save();
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    return 'get Products';
  }
  async updateProduct() {}
  async deleteProduct() {}

  // more

  async getProductById() {}
  async filterProducts() {}
}
