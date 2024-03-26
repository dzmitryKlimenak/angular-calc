import { FormControl } from '@angular/forms';
import { ETodoAction, ETodoPriority } from './todo-manager.enum';
import { IUserData } from '../../shared/interface';

export type TodoActionType =
  | ETodoAction.ADD
  | ETodoAction.REMOVE
  | ETodoAction.EDIT
  | ETodoAction.REMOVE_ALL
  | ETodoAction.FILTER
  | ETodoAction.SHOW_ALL
  | ETodoAction.BY_ID;

export interface ITodoItemFormGroup {
  state: FormControl<boolean>;
  title: FormControl<string>;
}
export interface ITodoListFormGroup {
  user: FormControl<IUserData | null>;
  priority: FormControl<number | null>;
}
export type TodoPriorityType =
  | ETodoPriority.NONE
  | ETodoPriority.LOW
  | ETodoPriority.MEDIUM
  | ETodoPriority.HIGH
  | ETodoPriority.CRITICAL;
