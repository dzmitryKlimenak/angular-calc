import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { AuthModule } from '../auth/auth.module';
import { ThemeSwitcherModule } from '../theme-swithcher/theme-swithcher.module';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingModule } from './component/loading/loading.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskProgressComponent } from './component/task-progress/task-progress.component';

@NgModule({
  declarations: [HeaderComponent, TaskProgressComponent],
  imports: [
    CommonModule,
    AuthModule,
    ThemeSwitcherModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    LoadingModule,
    MatProgressBarModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
