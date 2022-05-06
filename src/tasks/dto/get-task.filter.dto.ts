import { IsEmpty, IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  status: TaskStatus;

  @IsOptional()
  @IsEmpty()
  search: string;
}
