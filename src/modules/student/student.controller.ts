import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { JwtAuthGuard } from '../authenticate/guards/jwtAuth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
@ApiTags('Student')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() reqDto: CreateStudentDto, @Req() req): Promise<Student> {
    return this.studentService.create(reqDto, req.user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Get listing of students', type: Student })
  async findAll(@Query() query): Promise<Student[]> {
    return await this.studentService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateById(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.deleteById(id);
  }
}
