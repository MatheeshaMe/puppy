import { CreateShopDTO } from './dto/create-shop.dto';
import { Injectable } from '@nestjs/common';
import { ShopDocument, Shop } from './schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Shop') private prodcutSchema: Model<ShopDocument>,
  ) {}

  async createProduct(productDTO: CreateShopDTO, user: User): Promise<Shop> {
    try {
      const { productname, productPrice, productphoto, producttype } =
        productDTO;
      const { _id } = user;
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
