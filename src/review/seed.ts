import { ReviewSeeder } from './review.seeder';
import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './schema/review.schema';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://praveen:praveen@cluster0.f1ey7.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
  ],
}).run([ReviewSeeder]);
