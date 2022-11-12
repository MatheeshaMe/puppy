import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogDocument } from './schema/schema.blog';
import { Model } from 'mongoose';
import { CreateBlogDTO, UpdateBlogDTO } from './dto/blog.dto';
import { User } from '../user/schema/user.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private readonly blogModel: Model<BlogDocument>,
  ) {}

  async createBlog(createBlogDTO: CreateBlogDTO, user: User) {}
  async getBlogById(id: string) {}
  async getBlogs() {}
  async updateBlog(updateBlogDTO: UpdateBlogDTO, id: string, user: User) {}
  async deletBlog(id: string, user: User) {}
}
