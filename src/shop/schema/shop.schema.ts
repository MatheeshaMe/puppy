import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes, Types } from 'mongoose';
import { ProductType } from '../dto/create-shop.dto';

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Shop {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  seller: Types.ObjectId;

  @Prop()
  productname: string;

  @Prop()
  productPrice: number;

  @Prop()
  productphoto: string;

  @Prop()
  producttype: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
