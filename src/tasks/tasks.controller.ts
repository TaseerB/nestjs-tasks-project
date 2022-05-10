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
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task.filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.info({ createTaskDto });
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
    // console.info({ filterDto });
    // if (Object.keys(filterDto).length)
    //   return this.tasksService.findFilterTasks(filterDto);
    // return this.tasksService.findAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Get(':id')
  // findTaskById(@Param('id') id: string) {
  //   return this.tasksService.findTaskById(id);
  // }

  @Patch(':id')
  updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Delete(':id')
  removeTaskById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.tasksService.removeTaskById(id);
  }
}
