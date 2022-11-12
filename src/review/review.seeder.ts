import { seeder, DataFactory } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
// import { Shop, ShopDocument } from './schema/shop.schema';
import { Model } from 'mongoose';
// import { DataFactory } from "nestjs-seeder/dist/factory/data.factory";
import { ReviewDocument, Review } from './schema/review.schema';

export class ReviewSeeder {
  constructor(
    @InjectModel('Review') private readonly shopModel: Model<ReviewDocument>,
  ) {}

  drop(): Promise<any> {
    return this.shopModel.deleteMany({}) as any;
  }
  seed(): Promise<any> {
    const products = DataFactory.createForClass(Review).generate(100);
    return this.shopModel.insertMany(products);
  }
}
