import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from '../../dist/auth/auth.dto';
import { Payload } from './payload';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.register(registerDTO);

    const payload = {
      name: user.name,
      isAdmin: user.isAdmin,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.login(loginDTO);
    if (!user) {
      throw new HttpException('credentials invalid', HttpStatus.NOT_FOUND);
    }
    const payload = {
      name: user.name,
      isAdmin: user.isAdmin,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }
}
