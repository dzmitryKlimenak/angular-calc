import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoManagerLayoutComponent } from './todo-manager-layout/todo-manager-layout.component';
import { TodoManagerService } from './todo-manager.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoStateDirective } from './todo-state.directive';

@NgModule({
  declarations: [
    TodoManagerLayoutComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoStateDirective,
  ],
  exports: [TodoManagerLayoutComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatListModule,
    FontAwesomeModule,
  ],
  providers: [TodoManagerService],
})
export class TodoManagerModule {}
