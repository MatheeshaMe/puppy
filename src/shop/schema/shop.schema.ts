// import { ProductaType } from './shop.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes, Types } from 'mongoose';
// import { User, UserSchema } from 'src/user/schema/user.schema';
import { Type } from 'class-transformer';
import { Factory } from 'nestjs-seeder';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
export type ShopDocument = HydratedDocument<Shop>;
export type ProductType = 'Shampoo' | 'Toy' | 'Food';

@Schema({ timestamps: true })
export class Shop {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
    // default: '636eae357470ba9fc521b294',
  })
  owner: Types.ObjectId;

  @Factory((faker) => faker.lorem.words(2))
  @Prop()
  productname: string;

  @Factory((faker) => randomInt(10, 1000))
  @Prop()
  productPrice: number;

  @Factory((faker) => faker.image.cats(1234, 2345))
  @Prop()
  productphoto: string;

  @Factory((faker) => faker.helpers.arrayElement(['Shampoo', 'Toy', 'Food']))
  @Prop()
  producttype: ProductType;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
