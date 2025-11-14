import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import express from 'express';
import tasksStatusEnum from './enums/tasksStatusEnum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: express.Response,
  ) {
    const newTask = await this.tasksService.create(createTaskDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newTask,
      message: 'task is created!',
    });
  }

  @Get()
  async findAll(
    @Res() res: express.Response,
    @Query('status') status?: tasksStatusEnum,
    @Query('project') projectId?: number,
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 1,
  ) {
    const tasks = await this.tasksService.findAll(status, projectId, limit, page);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: tasks,
      message: 'tasks are founded!',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: express.Response) {
    const task = await this.tasksService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: task,
      message: 'task is founded!',
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: express.Response,
  ) {
    const updateTask = await this.tasksService.update(
      +id,
      updateTaskDto,
    );

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: updateTask,
      message: `task ${id} is updated!`,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: express.Response,) {
    await this.tasksService.remove(+id);

     return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: `task ${id} is deleted!`,
    });
  }
}
