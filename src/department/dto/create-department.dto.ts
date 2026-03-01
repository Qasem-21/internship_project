import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty({ message: 'please provide the name of department' })
  @MinLength(2, {
    message: 'department name must be at least 2 characters long',
  })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
