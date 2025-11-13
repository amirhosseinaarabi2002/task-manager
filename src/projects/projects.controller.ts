import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import projectsStatusEnum from './enums/projectsStatusEnum';
import express from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: express.Response,
  ) {
    const createProject = await this.projectsService.create(createProjectDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createProject,
      message: 'project is created!',
    });
  }

  @Get()
  async findAll(
    @Res() res: express.Response,
    @Query('status') status?: projectsStatusEnum,
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 1,
  ) {
    const projects = await this.projectsService.findAll(status, limit, page);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: projects,
      message: 'projects are founded!',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: express.Response) {
    const project = await this.projectsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: project,
      message: 'project is founded!',
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: express.Response,
  ) {
    const updateProject = await this.projectsService.update(
      +id,
      updateProjectDto,
    );

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: updateProject,
      message: `project ${id} is updated!`,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: express.Response) {
    await this.projectsService.remove(+id);

     return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      // data: updateProject,
      message: `project ${id} is deleted!`,
    });
  }
}
