import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>

@Schema({timestamps:true})
export class Review{
 @Prop()
 owner:Types.ObjectId

 @Prop()
 review:string;

 @Prop()
 star:number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review)