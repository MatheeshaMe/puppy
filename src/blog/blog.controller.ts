import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Param,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BlogService } from './blog.service';
import { CreateBlogDTO, UpdateBlogDTO } from './dto/blog.dto';
import { User } from '../user/schema/user.schema';
import { UserDec } from '../utilities/user.decorator';
import { AdminGuard } from '../guards/admin.guard';
// import { Query } from 'mongoose';
import { Request } from 'express';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async createBlog(
    @Body() createBlogDTO: CreateBlogDTO,
    @UserDec() user: User,
  ) {
    try {
      return await this.blogService.createBlog(createBlogDTO, user);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    try {
      return await this.blogService.getBlogById(id);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getBlogs(@Req() req: Request, @Query() { skip, limit }) {
    try {
      return await this.blogService.getBlogs(
        req,
        parseInt(skip, 10),
        parseInt(limit, 10),
      );
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateBlog(
    @Body() updateBlogDTO: UpdateBlogDTO,
    @Param('id') id: string,
    @UserDec() user: User,
  ) {
    return await this.blogService.updateBlog(updateBlogDTO, id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async deletBlog(@Param('id') id: string, @UserDec() user: User) {
    return await this.blogService.deletBlog(id, user);
  }
}
