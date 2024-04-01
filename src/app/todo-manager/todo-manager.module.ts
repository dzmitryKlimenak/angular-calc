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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { TodoListFilterPipe } from './pipe/todo-list-filter.pipe';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { TodoPriorityLabelPipe } from './pipe/todo-priority-label.pipe';
import { CreateNewTodoDialogComponent } from './component/create-new-todo-dialog/create-new-todo-dialog.component';
import { DialogModule } from '../shared/component/dialog/dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditTodoDialogComponent } from './component/edit-todo-dialog/edit-todo-dialog.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoListItemComponent,
    TodoStateDirective,
    TodoItemComponent,
    TodoListFilterPipe,
    TodoPriorityLabelPipe,
    CreateNewTodoDialogComponent,
    EditTodoDialogComponent,
  ],
  imports: [
    CommonModule,
    TodoManagerRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatListModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    DialogModule,
    MatTooltipModule,
  ],
  providers: [AuthGuard, TodoListService, UsersService, TodoListResolver, TodoItemResolver],
})
export class TodoManagerModule {}
