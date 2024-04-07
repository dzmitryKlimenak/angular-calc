import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem, IUserData } from '../interface';

@Pipe({
  name: 'todoListFilter',
})
export class TodoListFilterPipe implements PipeTransform {
  transform(
    value: ITodoItem[],
    filter: Partial<{ user: IUserData; priority?: number; state?: boolean }>,
  ): ITodoItem[] {
    return value.filter((todo: ITodoItem) => {
      const userMatch =
        filter.user === undefined || filter.user === null || todo.userId === filter.user.id;
      const stateMatch =
        filter.state === undefined || filter.state === null || todo.completed === filter.state;
      // Added: Compare todos priority with the filter's priority if defined
      const priorityMatch =
        filter.priority === undefined ||
        filter.priority === null ||
        todo.priority === filter.priority;

      // Update return statement to include priorityMatch
      return userMatch && stateMatch && priorityMatch;
    });
  }
}
