import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import projectsStatusEnum from '../enums/projectsStatusEnum';
import { Task } from '../../tasks/entities/task.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: projectsStatusEnum.enable, type: 'enum', enum: projectsStatusEnum })
  status: projectsStatusEnum;

  @OneToMany(() => Task, (task)=> task.project)
  tasks: Task[]
}
