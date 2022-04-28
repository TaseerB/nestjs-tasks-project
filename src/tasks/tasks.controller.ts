import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.info({ createTaskDto });
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAllTasks(): Task[] {
    return this.tasksService.findAllTasks();
  }

  @Get(':id')
  findTaskById(@Param('id') id: string) {
    return this.tasksService.findTaskById(id);
  }

  @Patch(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Delete(':id')
  removeTaskById(@Param('id') id: string) {
    return this.tasksService.removeTaskById(id);
  }
}
