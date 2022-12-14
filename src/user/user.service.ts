import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaNames } from '../config/SchemaNames';
import { User, UserDocument } from './schema/user.schema';
import { LoginUserDTO } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../auth/payload';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SchemaNames.USER) private userModel: Model<UserDocument>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User | string | any> {
    try {
      const { name, address, photo, accounts, password, isAdmin } =
        createUserDto;

      const user = await this.userModel.findOne({ name: name });
      if (user) {
        throw new HttpException(
          'user already exist',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const newUser = new this.userModel({
        name,
        address,
        photo,
        accounts,
        password: hashedPassword,
        isAdmin,
      });
      const usr = await newUser.save();
      return usr;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async login(
    loginUserDTO: LoginUserDTO,
  ): Promise<User | HttpException | string | {} | any> {
    console.log('login');
    try {
      const { name, password } = loginUserDTO;

      const user = await this.userModel.findOne({ name });
      // return user;
      // .select('name address photo accounts password ');

      if (!user) {
        throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      console.log('line 46 login');
      if (await bcrypt.compare(password, user.password)) {
        console.log("line 62",user)
        const {password ,...data} = user
        return{
          user:data,
          status: new HttpException("Accepted",HttpStatus.ACCEPTED)
        }
      } else {
        throw new HttpException(
          'password does not match',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findByPayload(payload: Payload): Promise<User> {
    const { name } = payload;
    return await this.userModel.findOne({ name });
  }

  async updateUser(updateUserDTO: UpdateUserDto): Promise<User | any> {
    try {
      const { name, address, photo, accounts } = updateUserDTO;
      const user = await this.userModel.findOne({ name });
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      const filter = { name: name };
      const update = {
        name,
        address,
        photo,
        accounts,
      };
      const newUser = await this.userModel.find(filter, update, {
        returnNewDocument: true,
      });
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const isUserAvailable = await this.userModel.findById(id);
      if (!isUserAvailable) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      await this.userModel.findByIdAndDelete(id);
      return 'user has been deleted';
    } catch (error) {
      console.log(error);
    }
  }
}
