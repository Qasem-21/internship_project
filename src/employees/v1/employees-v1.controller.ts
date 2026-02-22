import { Controller, Get } from '@nestjs/common';
import { EmployeesService_v1 } from './employees-v1.service';

@Controller({
  path: 'employees',
  version: '1',
})
export class EmployeesController_v1 {
  constructor(private readonly service: EmployeesService_v1) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
