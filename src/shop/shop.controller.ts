import { CreateShopDTO } from './dto/create-shop.dto';
import { Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { Body, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { ShopService } from './shop.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { UserDec } from '../utilities/user.decorator';
import { User } from '../user/schema/user.schema';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { Request } from 'express';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  createProduct(
    @UserDec() user: User,
    @Body() createProductDTO: CreateShopDTO,
  ) {
    console.log(user._id);
    try {
      // const {productname,productPrice,productphoto,producttype} = createProductDTO
      // const {_id} = user

      return this.shopService.createProduct(createProductDTO, user);
    } catch (error) {}
  }

  @Get()
  findAll(@Req() req: Request, @Query() { skip, limit }) {
    try {
      return this.shopService.getProducts(
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
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: UpdateShopDTO,
    @UserDec() user: User,
  ) {
    try {
      return await this.shopService.updateProduct(id, updateProduct, user);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async deleteProduct(@Param('id') id: string, @UserDec() user: User) {
    try {
      return await this.shopService.deleteProduct(id, user);
    } catch (error) {
      return error;
    }
  }
}
