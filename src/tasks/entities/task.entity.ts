import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import tasksStatusEnum from '../enums/tasksStatusEnum';
import { Project } from '../../projects/entities/project.entity';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: tasksStatusEnum, default: tasksStatusEnum.set })
  status: tasksStatusEnum;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
