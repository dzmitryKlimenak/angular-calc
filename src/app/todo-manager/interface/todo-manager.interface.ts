import { FormControl } from '@angular/forms';
import { ETodoAction } from './todo-manager.enum';

export interface ITodoItemFilter {
  [key: string]: boolean | string | number;
}

export type TodoActionType =
  | ETodoAction.ADD
  | ETodoAction.REMOVE
  | ETodoAction.EDIT
  | ETodoAction.REMOVE_ALL
  | ETodoAction.FILTER
  | ETodoAction.SHOW_ALL
  | ETodoAction.BY_ID;

export interface ITodoItemFormgroup {
  state: FormControl<boolean>;
  title: FormControl<string>;
}
