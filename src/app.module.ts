import { Module } from '@nestjs/common';

import { PuppyModule } from './puppy/puppy.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { ReviewModule } from './review/review.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    PuppyModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL!),
    UserModule,
    AuthModule,
    ShopModule,
    ReviewModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
