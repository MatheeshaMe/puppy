import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePuppyDto } from './dto/create-puppy.dto';
import { UpdatePuppyDto } from './dto/update-puppy.dto';
import { PuppuDocument, Puppy } from './schema/puppy.schema';
import { SchemaNames } from '../config/SchemaNames';

@Injectable()
export class PuppyService {
  constructor(
    @InjectModel(SchemaNames.PUPPY) private puppyModel: Model<PuppuDocument>,
  ) {}

  async create(createPuppyDto: CreatePuppyDto): Promise<Puppy | string> {
    try {
      const newPuppy = await new this.puppyModel(createPuppyDto);
      return newPuppy.save();
    } catch {
      return `there is an error`;
    }
  }

  async findAll(): Promise<Puppy[] | string | NotFoundException> {
    try {
      const allPuppies = await this.puppyModel.find();

      if (allPuppies.length < 0) {
        return new NotFoundException(`there is no puppies`);
      }
      return allPuppies;
    } catch {
      return `There is no puppy created yet`;
    }
  }

  async findOne(id: string): Promise<Puppy | string | NotFoundException> {
    try {
      const puppy = await this.puppyModel.findById(id);

      if (!puppy) {
        return new NotFoundException('no puppy found');
      }
      return puppy;
    } catch (error) {
      return error && ` there is an error`;
    }
  }

  async update(
    id: string,
    updatePuppyDto: UpdatePuppyDto,
  ): Promise<Puppy | string | NotFoundException> {
    try {
      const puppy = await this.puppyModel.findById(id);

      if (!puppy) {
        return new NotFoundException('no puppy found');
      }
      const updatedPuppy = await this.puppyModel.findByIdAndUpdate(
        id,
        updatePuppyDto,
      );
      return updatedPuppy;
    } catch (error) {
      return error && ` there is an error`;
    }
  }

  async remove(id: string) {
    try {
      const puppy = await this.puppyModel.findById(id);

      if (!puppy) {
        return new NotFoundException('no puppy found');
      }

      await this.puppyModel.findByIdAndDelete(id);
      return `puppy ${id} has been deleted`;
    } catch (error) {
      return error && ` there is an error`;
    }
  }
}
