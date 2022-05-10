import { IsEmpty, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
