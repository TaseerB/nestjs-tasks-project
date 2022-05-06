import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-task.filter.dto';

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

  findFilterTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
    const { status, search } = getTasksFilterDto;
    {
      let filterTasks = this.findAllTasks();

      if (status) {
        filterTasks = filterTasks.filter((task) => task.status === status);
      }

      if (search) {
        filterTasks = filterTasks.filter(
          (task) =>
            task.title.includes(search) || task.description.includes(search),
        );
      }

      // const filterTasks = this.tasks.filter((task) => {
      // return task.status === status && task.title === search;
      // });

      return filterTasks;
    }
  }

  findAllTasks(): Task[] {
    console.info('--- Finding Tasks Function ---');
    return this.tasks;
  }

  findTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task?.id === id);
    if (foundTask) return foundTask;
    throw new NotFoundException(`task with id ${id} not found`);
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
    this.findTaskById(id);
    this.tasks = this.tasks.filter((task) => task?.id !== id);
    return 'Task Deleted';
  }
}
