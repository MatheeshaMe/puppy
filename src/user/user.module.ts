import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaNames } from 'src/config/SchemaNames';
import { UserSchema } from './schema/user.schema';
// import { globalAgent } from 'http';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SchemaNames.USER,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
