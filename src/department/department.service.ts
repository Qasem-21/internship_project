import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  // --- Reusable Prisma Error Handler ---
  private handlePrismaError(error: any) {
    // Unique constraint error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'A department with this name already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.code === 'P2003') {
        // Foreign key constraint
        throw new HttpException(
          'Cannot delete department because employees are still assigned to it.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Record not found
      if (error.code === 'P2025') {
        throw new NotFoundException('Department not found.');
      }
    }
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      return this.prisma.department.create({
        data: {
          name: createDepartmentDto.name,
          description: createDepartmentDto.description,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.department.findMany();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      const department = await this.prisma.department.findUnique({
        where: { id },
      });
      if (!department) {
        throw new NotFoundException('Department not found.');
      }
      return department;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      return this.prisma.department.update({
        where: { id },
        data: {
          name: updateDepartmentDto.name,
          description: updateDepartmentDto.description,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.department.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }
}
