import { CreateShopDTO } from './dto/create-shop.dto';
import { Controller, Get, Post } from '@nestjs/common';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { ShopService } from './shop.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  createProduct(@Body() createProductDTO: CreateShopDTO) {
    return this.shopService.createProduct(createProductDTO);
  }

  @Get()
  findAll() {
    return this.shopService.getProducts();
  }
}
