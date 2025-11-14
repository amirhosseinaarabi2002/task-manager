import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import tasksStatusEnum from '../enums/tasksStatusEnum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(tasksStatusEnum, { message: 'the status is not valid!' })
  @IsOptional()
  status: tasksStatusEnum;

  @IsNotEmpty()
  projectId: number
}
