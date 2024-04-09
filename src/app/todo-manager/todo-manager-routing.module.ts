import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoItemComponent } from './component/todo-item/todo-item.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { TodoItemResolver } from './resolver/todo-item.resolver';

const routes: Routes = [
  {
    path: '',
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
