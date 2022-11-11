import { CreateShopDTO } from './dto/create-shop.dto';
import { Injectable } from '@nestjs/common';
import { ShopDocument, Shop } from './schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Shop') private prodcutSchema: Model<ShopDocument>,
  ) {}

  async createProduct(productDTO: CreateShopDTO): Promise<Shop> {
    try {
      const newProduct = await new this.prodcutSchema(productDTO);
      return newProduct;
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
