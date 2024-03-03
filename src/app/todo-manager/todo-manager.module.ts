import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoManagerService } from './todo-manager.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoStateDirective } from './todo-state.directive';
import { TodoManagerRoutingModule } from './todo-manager-routing.module';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AuthGuard } from './guard/auth.guard';

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
  providers: [TodoManagerService, AuthGuard],
})
export class TodoManagerModule {}
