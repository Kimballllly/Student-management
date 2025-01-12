import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async update(id: number, studentData: Partial<Student>): Promise<Student> {
    await this.studentRepository.update(id, studentData);
    return this.studentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}