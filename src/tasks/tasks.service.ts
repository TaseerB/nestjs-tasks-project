import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-task.filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { CreateTask, GetTasks } from 'src/common/common-interfaces';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  @InjectRepository(TaskRepository)
  private taskRepository: TaskRepository;
  // constructor() {}
  createTask(inputObject: CreateTask): Promise<Task> {
    const task = this.taskRepository.createTask(inputObject);
    return task;
  }

  async getTasks(getTasks: GetTasks): Promise<Task[]> {
    return this.taskRepository.getTasks(getTasks);
  }

  async getTaskById(id: number, user: User) {
    const foundTask = await this.taskRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (foundTask) return foundTask;
    throw new NotFoundException(`task with id ${id} not found`);
  }

  async updateTaskById(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });
    task.status = status;
    await task.save();
    return task;
  }

  async removeTaskById(id: number, user: User): Promise<object> {
    const taskDeleted = await this.taskRepository.delete({
      // where: {
      id: id,
      userId: user.id,
      // },
    });
    if (taskDeleted.affected === 0) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return { message: 'Task Deleted', taskDeleted };
  }
}
