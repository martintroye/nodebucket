import { Task } from './task.model';

export class TaskList {
  empId: number;
  todo: Task[];
  doing: Task[];
  done: Task[];
}