import mongoose from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  [x: string]: any;
  @Prop()
  name: string;

  @Prop()
  password: string;
  @Prop()
  address: string;

  @Prop()
  photo: string;

  @Prop()
  accounts: string;

  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('Shop', {
  ref: 'Shop',
  localField: '_id',
  foreignField: 'owner',
});
