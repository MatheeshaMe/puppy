import { CreateShopDTO } from './dto/create-shop.dto';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { ShopService } from './shop.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserDec } from 'src/utilities/user.decorator';
import { User } from '../user/schema/user.schema';

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
  findAll() {
    return this.shopService.getProducts();
  }
}
