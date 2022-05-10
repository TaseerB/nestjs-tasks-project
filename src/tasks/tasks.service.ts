import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-task.filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  @InjectRepository(TaskRepository)
  private taskRepository: TaskRepository;
  // constructor() {}
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.createTask(createTaskDto);
    return task;
  }
  // async findFilterTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
  //   const { status, search } = getTasksFilterDto;
  //   {
  //     let filterTasks = await this.findAllTasks();
  //     if (status) {
  //       filterTasks = filterTasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       filterTasks = filterTasks.filter(
  //         (task) =>
  //           task.title.includes(search) || task.description.includes(search),
  //       );
  //     }
  //     // const filterTasks = this.tasks.filter((task) => {
  //     // return task.status === status && task.title === search;
  //     // });
  //     return filterTasks;
  //   }
  // }
  // async findAllTasks(): Promise<Task[]> {
  //   console.info('--- Finding Tasks Function ---');
  //   const tasks = await this.taskRepository.find();
  //   return tasks;
  // }

  async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(getTasksFilterDto);
  }

  async getTaskById(id: number) {
    const foundTask = await this.taskRepository.findOne(id);

    if (foundTask) return foundTask;
    throw new NotFoundException(`task with id ${id} not found`);
  }

  // findTaskById(id: string): Task {
  //   const foundTask = this.tasks.find((task) => task?.id === id);
  //   if (foundTask) return foundTask;
  //   throw new NotFoundException(`task with id ${id} not found`);
  // }

  async updateTaskById(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    const task = await this.taskRepository.findOne(id);
    task.status = status;
    await task.save();
    return task;
  }

  async removeTaskById(id: number): Promise<object> {
    const taskDeleted = await this.taskRepository.delete(id);
    if (taskDeleted.affected === 0) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return { message: 'Task Deleted', taskDeleted };
  }
}
