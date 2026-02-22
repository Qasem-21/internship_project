import { Module } from '@nestjs/common';

import { EmployeesService_v1 } from './v1/employees-v1.service';
import { EmployeesController_v1 } from './v1/employees-v1.controller';
import { EmployeesController_v2 } from './v2/employees-v2.controller';
import { EmployeesService_v2 } from './v2/employees-v2.service';
@Module({
  controllers: [EmployeesController_v1, EmployeesController_v2],
  providers: [EmployeesService_v1, EmployeesService_v2],
})
export class EmployeesModule {}
