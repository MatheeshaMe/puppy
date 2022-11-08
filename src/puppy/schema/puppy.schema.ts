import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PetType } from '../dto/create-puppy.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export type PuppuDocument = HydratedDocument<Puppy>;

@Schema()
export class Puppy {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop([String])
  type: string[];

  @Prop()
  breed: string;

  @Prop([String])
  photo: string[];

  @Prop()
  location: string;

  @Prop()
  phoneNumber: string;
}

export const PuppySchema = SchemaFactory.createForClass(Puppy);
