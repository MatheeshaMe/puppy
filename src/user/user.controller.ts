import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDTO } from './dto/loginUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('register')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.register(createUserDto);
  // }

  // @Post('login')
  // login(@Body() loginUserDTO: LoginUserDTO) {
  //   return this.userService.findByLogin(loginUserDTO);
  // }

  @Put(":name")
  updateUser(@Body() updateUserDTO:UpdateUserDto){
    return this.userService.updateUser(updateUserDTO)
  }
}
