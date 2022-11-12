// import { ProductaType } from './shop.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes, Types } from 'mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Type } from 'class-transformer';
export type ShopDocument = HydratedDocument<Shop>;
export type ProductType = "Shampoo" | "Toy" | "Vitamin"

@Schema({ timestamps: true })
export class Shop {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop()
  productname: string;

  @Prop()
  productPrice: number;

  @Prop()
  productphoto: string;

  @Prop()
  producttype: ProductType;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
