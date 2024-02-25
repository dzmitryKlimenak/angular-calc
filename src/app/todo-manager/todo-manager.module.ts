import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoManagerLayoutComponent } from './todo-manager-layout/todo-manager-layout.component';
import { TodoManagerService } from './todo-manager.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TodoManagerLayoutComponent, TodoListComponent, TodoItemComponent],
  exports: [TodoManagerLayoutComponent],
  imports: [CommonModule, MatButtonModule],
  providers: [TodoManagerService],
})
export class TodoManagerModule {}
