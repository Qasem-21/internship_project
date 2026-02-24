import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService_v1 {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.employee.findMany({
      select: { fullName: true, email: true },
    });
  }
}
