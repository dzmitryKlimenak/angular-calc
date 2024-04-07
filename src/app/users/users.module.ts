import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserTasksProgressComponent } from './component/user-tasks-progress/user-tasks-progress.component';

@NgModule({
  declarations: [UserTasksProgressComponent],
  imports: [CommonModule, UsersRoutingModule],
  exports: [UserTasksProgressComponent],
})
export class UsersModule {}
