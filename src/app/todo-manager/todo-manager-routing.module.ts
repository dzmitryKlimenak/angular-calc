import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoItemComponent } from './component/todo-item/todo-item.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { AuthGuard } from './guard/auth.guard';
import { TodoListResolver } from './resolver/todo-list.resolver';
import { TodoItemResolver } from './resolver/todo-item.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: [TodoListResolver],
    component: TodoListComponent,
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    resolve: { todo: TodoItemResolver },
    component: TodoItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoManagerRoutingModule {}
