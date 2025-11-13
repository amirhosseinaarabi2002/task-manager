import projectsStatusEnum from '../enums/projectsStatusEnum';

export class CreateProjectDto {
  name: string;

  status: projectsStatusEnum;
}
