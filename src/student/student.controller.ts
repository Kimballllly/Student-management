import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() studentData: Partial<Student>) {
    return this.studentService.create(studentData);
  }

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() studentData: Partial<Student>) {
    return this.studentService.update(id, studentData);
  }
}
