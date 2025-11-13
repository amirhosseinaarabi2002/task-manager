import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import projectsStatusEnum from '../enums/projectsStatusEnum';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'the name field can not be empty!' })
  @IsString()
  @MinLength(5)
  name: string;

  @IsEnum(projectsStatusEnum, {message: 'the status is not valid!'})
  status: projectsStatusEnum;
}
