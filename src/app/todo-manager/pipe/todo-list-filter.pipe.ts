import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem, IUserData } from '../../shared/interface';

@Pipe({
  name: 'todoListFilter',
})
export class TodoListFilterPipe implements PipeTransform {
  transform(value: ITodoItem[], filter: Partial<{ user: IUserData; state: boolean }>): ITodoItem[] {
    return value.filter((todo: ITodoItem) => {
      const userMatch = filter.user?.id === undefined || todo.userId === filter.user.id;
      const stateMatch = filter.state === undefined || todo.completed === filter.state;
      return userMatch && stateMatch;
    });
  }
}
