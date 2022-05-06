import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { GetTasksFilterDto } from './dto/get-task.filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.info({ createTaskDto });
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    console.info({ filterDto });
    if (Object.keys(filterDto).length)
      return this.tasksService.findFilterTasks(filterDto);
    return this.tasksService.findAllTasks();
  }

  @Get(':id')
  findTaskById(@Param('id') id: string) {
    return this.tasksService.findTaskById(id);
  }

  @Patch(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Delete(':id')
  removeTaskById(@Param('id') id: string) {
    return this.tasksService.removeTaskById(id);
  }
}
