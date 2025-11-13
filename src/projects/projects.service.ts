import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import projectsStatusEnum from './enums/projectsStatusEnum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const newProject = this.projectRepository.create(createProjectDto);

      return await this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('error creating project!');
    }
  }

  async findAll(
    status?: projectsStatusEnum,
    limit: number = 5,
    page: number = 1,
  ) {
    const query = this.projectRepository.createQueryBuilder('projects');

    if (status) {
      query.where('status = :x', { x: status });
    }

    query.skip((page - 1) * limit).take(limit);
    return await query.getMany();
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`project ${id} not found!`);
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`project ${id} not found!`);
    }

    try {
      const updateProject = await this.projectRepository.update(
        id,
        updateProjectDto,
      );
      return updateProject;
    } catch (error) {
      throw new BadRequestException('updating project failed!');
    }
  }

  async remove(id: number) {
    // const project = await this.projectRepository.findOneBy({ id });

    // if (!project) {
    //   throw new NotFoundException(`project ${id} not found!`);
    // }

    // try {
    //   const removeProject = await this.projectRepository.delete({ id });

    //   return removeProject;
    // } catch (error) {
    //   throw new BadRequestException('removing project failed!');
    // }

    const removeProject = await this.projectRepository.delete({ id })

    if (removeProject.affected === 0) {
      throw new NotFoundException(`project ${id} not found!`);
    }
  }
}
