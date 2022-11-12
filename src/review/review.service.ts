import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument, Review } from './schema/review.schema';
import { CreateReviewDTO, UpdateReviewDTO } from './dto/review.dto';
import { User } from '../user/schema/user.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async createReview(
    createReviewDTO: CreateReviewDTO,
    user: User,
  ): Promise<Review | Error> {
    try {
      const { review, star } = createReviewDTO;
      const { _id } = user;

      const newReview = await new this.reviewModel({
        owner: _id,
        review: review,
        star: star,
      });

      return newReview.save();
    } catch (error) {
      return error;
    }
  }

  async getReviews(): Promise<Review[] | Error | HttpException | number> {
    try {
      const reviews = await this.reviewModel.find();
      if (reviews.length < 1) {
        return new HttpException('Not reviews found', HttpStatus.NOT_FOUND);
      }
      return reviews;
    } catch (error) {
      return error;
    }
  }

  async updateReview(updateReviewDTO: UpdateReviewDTO, user: User, id: string) {
    try {
      const review = await this.reviewModel.findById(id);
      if (!review) {
        throw new HttpException('review not found', HttpStatus.NOT_FOUND);
      }
      console.log(user._id !== review.owner);
      if (user._id.toString() !== review.owner.toString()) {
        throw new HttpException(
          'You are not the owner of the review',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updatedReview = await this.reviewModel.findByIdAndUpdate(
        id,
        updateReviewDTO,
        { new: true },
      );
      return updatedReview;
    } catch (error) {
      return error;
    }
  }

  async deleteReview(id: string, user: User) {
    try {
      const review = await this.reviewModel.findById(id);
      if (!review) {
        throw new HttpException('review not found', HttpStatus.NOT_FOUND);
      }
      if (user._id.toString() !== review.owner.toString()) {
        throw new HttpException(
          'You are not the owner of the review',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.reviewModel.findByIdAndDelete(id);
      return {
        message: 'Review has been successfully deleted',
      };
    } catch (error) {
      return error;
    }
  }
}
