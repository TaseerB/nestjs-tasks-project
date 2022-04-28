import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, attachment, dueTime } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.PENDING,
      attachment,
      dueTime,
    };
    this.tasks.push(task);
    return task;
  }

  findAllTasks(): Task[] {
    console.info('--- Finding Tasks Function ---');
    return this.tasks;
  }

  findTaskById(id: string): Task {
    return this.tasks.find((task) => task?.id === id);
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto) {
    const { status } = updateTaskDto;
    const task = this.findTaskById(id);
    task.status = status;
    return task;
    // this.tasks.forEach((task) => {
    //   if (task?.id === id) {
    //     task.status = status;
    //   }
    // });

    // return this.tasks.find((task) => task.id === id);
    // return `This action updates a #${id} task`;
  }

  removeTaskById(id: string): string {
    this.tasks = this.tasks.filter((task) => task?.id !== id);
    return 'Task Deleted';
  }
}
