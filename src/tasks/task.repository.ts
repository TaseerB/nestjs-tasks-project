import { CreateTask, GetTasks } from 'src/common/common-interfaces';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(getTasks: GetTasks): Promise<Task[]> {
    const { filterDto, user } = getTasks;
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;

    console.info({ status, search });

    if (status) {
      query.where(`task.status = :status`, { status });
    }
    if (search) {
      query.orWhere(
        `(task.title like :search or task.description like :search)`,
        {
          search: `%${search}%`,
        },
      );
    }

    query.andWhere(`task.userId = :userId`, { userId: user.id });

    const tasks = query.getMany();
    console.info({ query: query.getSql() });
    return tasks;
  }

  async createTask(inputObject: CreateTask): Promise<Task> {
    const { createTaskDto, user } = inputObject;
    const { title, description, attachment, dueTime } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.attachment = attachment;
    task.dueTime = dueTime;
    task.status = TaskStatus.IN_PROGRESS;
    task.user = user;

    await task.save();

    delete task.user;

    return task;
  }
}
