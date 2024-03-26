import { Pipe, PipeTransform } from '@angular/core';
import { TodoPriorityType } from '../interface/todo-manager.interface';
import { ETodoPriority } from '../interface/todo-manager.enum';

@Pipe({
  name: 'todoPriorityLabel',
})
export class TodoPriorityLabelPipe implements PipeTransform {
  transform(value: number): TodoPriorityType {
    switch (value) {
      case 0:
        return ETodoPriority.NONE;
      case 1:
        return ETodoPriority.LOW;
      case 2:
        return ETodoPriority.MEDIUM;
      case 3:
        return ETodoPriority.HIGH;
      case 4:
        return ETodoPriority.CRITICAL;
      default:
        return ETodoPriority.NONE;
    }
  }
}
