import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import projectsStatusEnum from '../enums/projectsStatusEnum';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: projectsStatusEnum.enable, type: 'enum', enum: projectsStatusEnum })
  status: projectsStatusEnum;
}
