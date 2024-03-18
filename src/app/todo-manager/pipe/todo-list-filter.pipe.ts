import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem, IUserData } from '../../shared/interface';

@Pipe({
  name: 'todoListFilter',
})
export class TodoListFilterPipe implements PipeTransform {
  transform(value: ITodoItem[], filter: Partial<{ user: IUserData; state: boolean }>): ITodoItem[] {
    return value.filter((todo: ITodoItem) => {
      if (filter.user && filter.state) {
        return todo.userId === filter.user.id && todo.completed === filter.state;
      } else if (filter.user) {
        return todo.userId === filter.user.id;
      } else if (filter.state) {
        return todo.completed === filter.state;
      } else {
        return true;
      }
    });
  }
}
