import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = getTasksFilterDto;

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

    const tasks = query.getMany();
    console.info({ tasks, query: query.getSql() });
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, attachment, dueTime } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.attachment = attachment;
    task.dueTime = dueTime;
    task.status = TaskStatus.IN_PROGRESS;

    return await task.save();
  }
}
