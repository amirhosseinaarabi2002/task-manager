import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import tasksStatusEnum from '../enums/tasksStatusEnum';

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

  
}
