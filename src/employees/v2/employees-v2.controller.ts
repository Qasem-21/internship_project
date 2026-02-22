import { Controller, Get } from '@nestjs/common';
import { EmployeesService_v2 } from './employees-v2.service';

@Controller({
  path: 'employees',
  version: '2',
})
export class EmployeesController_v2 {
  constructor(private readonly service: EmployeesService_v2) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
