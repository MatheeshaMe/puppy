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
  import { AuthGuard } from '@nestjs/passport';

import { BlogService } from './blog.service';
import { CreateBlogDTO, UpdateBlogDTO } from './dto/blog.dto';
import { User } from '../user/schema/user.schema';
import { UserDec } from 'src/utilities/user.decorator';
import { AdminGuard } from '../guards/admin.guard';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService:BlogService){}
    
    @Post()
    @UseGuards(AuthGuard("jwt"),AdminGuard)
    async createBlog(@Body() createBlogDTO: CreateBlogDTO, @UserDec() user: User) {
    }
    async getBlogById(id: string) {}
    async getBlogs() {}
    async updateBlog(updateBlogDTO: UpdateBlogDTO, id: string, user: User) {}
    async deletBlog(id: string, user: User) {}
}
