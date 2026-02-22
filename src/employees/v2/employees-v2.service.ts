import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService_v2 {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<
    Prisma.EmployeeGetPayload<{
      include: { department: true; position: true };
    }>[]
  > {
    return this.prisma.employee.findMany({
      include: { department: true, position: true },
    });
  }
}
