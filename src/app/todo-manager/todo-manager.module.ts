import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoStateDirective } from './directive/todo-state.directive';
import { TodoManagerRoutingModule } from './todo-manager-routing.module';
import { TodoListItemComponent } from './component/todo-list-item/todo-list-item.component';
import { TodoItemComponent } from './component/todo-item/todo-item.component';
import { AuthGuard } from './guard/auth.guard';
import { TodoListService } from './service/todo-list.service';
import { UsersService } from './service/users.service';
import { TodoListResolver } from './resolver/todo-list.resolver';
import { TodoItemResolver } from './resolver/todo-item.resolver';

@NgModule({
  declarations: [TodoListComponent, TodoListItemComponent, TodoStateDirective, TodoItemComponent],
  imports: [
    CommonModule,
    TodoManagerRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatListModule,
    FontAwesomeModule,
  ],
  providers: [AuthGuard, TodoListService, UsersService, TodoListResolver, TodoItemResolver],
})
export class TodoManagerModule {}
