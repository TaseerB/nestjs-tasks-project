import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.COMPLETED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.PENDING,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    console.info({ value, metadata });
    // value = value.toUpperCase();

    let { status, dueTime } = value;

    status = status.toUpperCase();

    if (this.isStatusValid(status)) {
      return value;
    } else {
      throw new BadRequestException(`"${value?.status}" is not allowed`);
    }
  }

  private isStatusValid(value: any) {
    const idx = this.allowedStatus.indexOf(value);
    return idx !== -1;
  }
}
