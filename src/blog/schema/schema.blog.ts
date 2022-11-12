import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type BlogDocument = HydratedDocument<Blog>


@Schema({timestamps:true})
export class Blog{
   @Prop({default:"636eae2e7470ba9fc521b292"})
   owner:Types.ObjectId

   @Factory((faker) => faker.lorem.sentences(2))
   @Prop()
   title:string

   @Factory((faker) => faker.image.animals())
   @Prop()
   photos:string

   @Factory((faker) => faker.lorem.paragraph(8))
   @Prop()
   desc:string
}

export const BlogSchema = SchemaFactory.createForClass(Blog)