import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: TodoItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoManagerRoutingModule {}
