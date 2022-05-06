import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  attachment: string;

  @IsNotEmpty()
  dueTime: Date;
}
