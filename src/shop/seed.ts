import { seeder } from 'nestjs-seeder';
// import { Seeder } from 'nestjs-seeder';
// import {Seeder}
import { ShopSeeder } from './shop.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopDocument, ShopSchema } from './schema/shop.schema';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://praveen:praveen@cluster0.f1ey7.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema }]),
  ],
}).run([ShopSeeder]);
