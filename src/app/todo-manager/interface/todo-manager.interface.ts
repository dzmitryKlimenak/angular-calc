import { FormControl } from '@angular/forms';
import { ETodoAction } from './todo-manager.enum';
import { IUserData } from '../../shared/interface';

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

export interface ITodoItemFormGroup {
  state: FormControl<boolean>;
  title: FormControl<string>;
}
export interface ITodoListFormGroup {
  user: FormControl<IUserData | null>;
  state: FormControl<boolean | null>;
}
