import { seeder, DataFactory } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopDocument } from './schema/shop.schema';
import { Model } from 'mongoose';
// import { DataFactory } from "nestjs-seeder/dist/factory/data.factory";

export class ShopSeeder {
  constructor(
    @InjectModel('Shop') private readonly shopModel: Model<ShopDocument>,
  ) {}

  drop(): Promise<any> {
    return this.shopModel.deleteMany({}) as any;
  }
  seed(): Promise<any> {
    const products = DataFactory.createForClass(Shop).generate(100);
    return this.shopModel.insertMany(products);
  }
}
