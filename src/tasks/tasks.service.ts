import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import tasksStatusEnum from './enums/tasksStatusEnum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const { projectId, ...taskData } = createTaskDto;

      const project = await this.projectRepository.findOneByOrFail({
        id: projectId,
      });

      const newTask = this.taskRepository.create({
        ...taskData,
        project,
      });

      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new BadRequestException('create task failed!');
    }
  }

  async findAll(
    status?: tasksStatusEnum,
    projectId?: number | undefined,
    limit: number = 5,
    page: number = 1,
  ) {
    const query = this.taskRepository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.project', 'project');

    if (status) {
      query.where('tasks.status = :status', { status });
    }

    if (projectId) {
      query.where('project.id = :projectId', { projectId });
    }

    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!task) {
      throw new NotFoundException(`project ${id} not found!`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    // find task
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!task) {
      throw new NotFoundException(`task ${id} not found!`);
    }

    // find project
    const { projectId, ...taskData } = updateTaskDto;

    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project) {
      throw new NotFoundException(`project ${projectId} not found!`);
    }

    // merge data
    this.taskRepository.merge(task, {
      ...taskData,
      project,
    });

    try {
      const savedTask = await this.taskRepository.save(task);
      return savedTask;
    } catch (error) {
      throw new BadRequestException('updating task failed!');
    }
  }

  async remove(id: number) {
    const removeTask = await this.taskRepository.delete({ id });

    if (removeTask.affected === 0) {
      throw new NotFoundException(`task ${id} not found!`);
    }
  }
}
