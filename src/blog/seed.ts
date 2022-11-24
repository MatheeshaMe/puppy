import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schema/schema.blog';
import { BlogSeeder } from './blog.seeder';
import "dotenv/config"
seeder({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL_TEST
      // || "mongodb+srv://praveen:praveen@cluster0.f1ey7.mongodb.net/main"
      ),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
}).run([BlogSeeder]);
