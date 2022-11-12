import { UpdateShopDTO } from './dto/update-shop.dto';
import { CreateShopDTO } from './dto/create-shop.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ShopDocument, Shop } from './schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';

// export type ProductType = "Shampoo" | "Toy" | "Vitamin"

const array: string[] = ['Shampoo', 'Toy', 'Food'];

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
  async getProducts(): Promise<Shop[] | Error | HttpException> {
    try {
      const products = await this.prodcutSchema.find();
      console.log(products.length);
      if (products.length < 1) {
        return new HttpException('No products found', HttpStatus.NOT_FOUND);
      }
      return products;
    } catch (error) {
      return error;
    }
  }
  async updateProduct(id: string, updateProductDTO: UpdateShopDTO, user: User) {
    try {
      const product = await this.prodcutSchema.findById(id);
      if (!product) {
        return new HttpException('no product found', HttpStatus.NOT_FOUND);
      }
      console.log(product.owner.toString(), user._id.toString());
      if (product.owner.toString() !== user._id.toString()) {
        console.log('you are not the owner');
        throw new HttpException(
          'you are not the owner',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(updateProductDTO.productname);
      const updatedProduct = await this.prodcutSchema.findByIdAndUpdate(
        id,
        {
          productname: updateProductDTO.productname,
          productPrice: updateProductDTO.productPrice,
          productphoto: updateProductDTO.productphoto,
          producttype: updateProductDTO.producttype,
        },
        {
          new: true,
        },
      );
      console.log(updatedProduct);
      return updatedProduct;
    } catch (error) {
      return error;
    }
  }
  async deleteProduct(id: string, user: User) {
    try {
      const product = await this.prodcutSchema.findById(id);
      if (!product) {
        return new HttpException('no product found', HttpStatus.NOT_FOUND);
      }
      if (product.owner.toString() !== user._id.toString()) {
        console.log('you are not the owner');
        throw new HttpException(
          'you are not the owner',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.prodcutSchema.findByIdAndDelete(id);
      return 'Product has been deleted';
    } catch (error) {
      return error;
    }
  }
}
