import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from './auth.dto';
import { Payload } from './payload';
import { AdminGuard } from '../guards/admin.guard';
import { UserDec } from '../utilities/user.decorator';
import { User } from '../user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.register(registerDTO);

    const payload: Payload = {
      name: user.name,
      isAdmin: user.isAdmin,
    };

    console.log(payload)

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.login(loginDTO);
    if (!user) {
      throw new HttpException('credentials invalid', HttpStatus.NOT_FOUND);
    }
    const payload: Payload = {
      name: user.name,
      isAdmin: user.isAdmin,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  check(@UserDec() user: User) {
    console.log(user);
    return 'working';
  }
}
