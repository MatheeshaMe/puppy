import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDTO, UpdateReviewDTO } from './dto/review.dto';
import { UserDec } from '../utilities/user.decorator';
import { User } from '../user/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() createReviewDTO: CreateReviewDTO,
    @UserDec() user: User,
  ) {
    try {
      return await this.reviewService.createReview(createReviewDTO, user);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getReviews() {
    try {
      return await this.reviewService.getReviews();
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateReview(
    @Param('id') id: string,
    @UserDec() user: User,
    @Body() updateReviewDTO: UpdateReviewDTO,
  ) {
    try {
      return await this.reviewService.updateReview(updateReviewDTO, user, id);
    } catch (error) {}
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteReview(@UserDec() user: User, @Param('id') id: string) {
    return await this.reviewService.deleteReview(id, user);
  }
}
