import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schema/schema.blog';
import { BlogSeeder } from './blog.seeder';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://praveen:praveen@cluster0.f1ey7.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
}).run([BlogSeeder]);
