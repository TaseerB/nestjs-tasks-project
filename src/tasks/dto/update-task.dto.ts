import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '../task.model';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  status: TaskStatus;
}
