import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService_v2 {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.employee.findMany();
  }
}
