import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogDocument } from './schema/schema.blog';
import { Model } from 'mongoose';
import { CreateBlogDTO, UpdateBlogDTO } from './dto/blog.dto';
import { User } from '../user/schema/user.schema';
import { Request } from 'express';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private readonly blogModel: Model<BlogDocument>,
  ) {}

  async createBlog(createBlogDTO: CreateBlogDTO, user: User) {
    try {
      const { title, photo, desc } = createBlogDTO;
      const { _id } = user;
      const newBlog = await new this.blogModel({
        owner: _id,
        title: title,
        photo: photo,
        desc: desc,
      });

      return newBlog.save();
    } catch (error) {}
  }
  async getBlogById(id: string) {
    try {
      const blog = await this.blogModel.findById(id);
      if (!blog) {
        throw new HttpException('no blog found', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (error) {
      return error;
    }
  }
  async getBlogs(req: Request, skip: number, limit: number) {
    try {
      let options = {};

      if (req.query.search) {
        console.log(req.query.search);
        options = {
          $or: [
            {
              title: new RegExp(req.query.search.toString(), 'i'),
            },
          ],
        };
      }

      const blogs = await this.blogModel.find(options).skip(skip).limit(limit);
      if (blogs.length < 1) {
        throw new HttpException('no blogs found', HttpStatus.NOT_FOUND);
      }
      return blogs;
    } catch (error) {
      return error;
    }
  }
  async updateBlog(updateBlogDTO: UpdateBlogDTO, id: string, user: User) {
    try {
      const blog = await this.blogModel.findById(id);
      if (!blog) {
        throw new HttpException('no blog found', HttpStatus.NOT_FOUND);
      }

      //   const { title, photo, desc } = updateBlogDTO;
      //   const { _id } = user;
      if (user._id.toString() !== blog.owner.toString()) {
        throw new HttpException(
          'You are not the owner of the blog',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updatedBlog = await this.blogModel.findByIdAndUpdate(
        id,
        updateBlogDTO,
        { new: true },
      );

      return updatedBlog;
    } catch (error) {
      return error;
    }
  }
  async deletBlog(id: string, user: User) {
    try {
      const blog = await this.blogModel.findById(id);
      if (!blog) {
        throw new HttpException('no blog found', HttpStatus.NOT_FOUND);
      }

      //   const { title, photo, desc } = updateBlogDTO;
      //   const { _id } = user;
      if (user._id.toString() !== blog.owner.toString()) {
        throw new HttpException(
          'You are not the owner of the blog',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        message: 'Blog has been deleted successfully',
      };
    } catch (error) {
      return error;
    }
  }
}
