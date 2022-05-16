import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-task.filter.dto';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
}

export interface JwtPayload {
  name: string;
  email: string;
}

export interface CreateTask {
  createTaskDto: CreateTaskDto;
  user: User;
}

export interface GetTasks {
  filterDto: GetTasksFilterDto;
  user: User;
}
