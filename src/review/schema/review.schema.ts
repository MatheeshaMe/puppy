import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { randomInt } from 'crypto';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ default: '636eae2e7470ba9fc521b292' })
  owner: Types.ObjectId;

  @Factory((faker) => faker.lorem.sentences(2))
  @Prop()
  review: string;

  @Factory((faker) => randomInt(1, 6))
  @Prop()
  star: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
