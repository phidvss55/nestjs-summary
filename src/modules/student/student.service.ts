import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import mongoose, { Model } from 'mongoose';
import { Authenticate } from '../authenticate/entities/authenticate.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto, user: Authenticate) {
    const studentData = Object.assign(createStudentDto, { user: user._id });
    const createdCat = new this.studentModel(studentData);

    return createdCat.save();
  }

  async findAll(query: any): Promise<Student[]> {
    const perPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = perPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const data = await this.studentModel
      .find({ ...keyword })
      .limit(perPage)
      .skip(skip);

    return data;
  }

  async findById(id: string): Promise<Student> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.studentModel.findById(id);

    if (!book) {
      throw new NotFoundException('Student not found.');
    }

    return book;
  }

  async updateById(id: string, student: UpdateStudentDto): Promise<Student> {
    return await this.studentModel.findByIdAndUpdate(id, student, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Student> {
    return await this.studentModel.findByIdAndDelete(id);
  }
}
