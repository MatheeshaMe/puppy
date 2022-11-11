import { Module } from '@nestjs/common';
import { PuppyService } from './puppy.service';
import { PuppyController } from './puppy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaNames } from '../config/SchemaNames';
import { PuppySchema } from './schema/puppy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SchemaNames.PUPPY,
        schema: PuppySchema,
      },
    ]),
  ],
  controllers: [PuppyController],
  providers: [PuppyService],
})
export class PuppyModule {}
