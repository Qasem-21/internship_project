import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeV1Dto } from '../dto/employee-v1.dto';

@Injectable()
export class EmployeesService_v1 {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<EmployeeV1Dto[]> {
    return this.prisma.employee.findMany({
      select: { fullName: true, email: true },
    });
  }
}
