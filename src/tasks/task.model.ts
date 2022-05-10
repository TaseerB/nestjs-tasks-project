export interface Task {
  id: string;
  title: string;
  description: string;
  attachment: string | null;
  dueTime: Date;
  status: TaskStatus;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
