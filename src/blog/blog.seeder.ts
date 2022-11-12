import { seeder, DataFactory } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument, Blog } from './schema/schema.blog';

export class BlogSeeder {
  constructor(
    @InjectModel('Blog') private readonly blogModel: Model<BlogDocument>,
  ) {}

  drop(): Promise<any> {
    return this.blogModel.deleteMany({}) as any;
  }
  seed(): Promise<any> {
    const products = DataFactory.createForClass(Blog).generate(100);
    return this.blogModel.insertMany(products);
  }
}
