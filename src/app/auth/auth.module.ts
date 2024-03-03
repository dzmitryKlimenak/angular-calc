import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, MatSlideToggleModule, FontAwesomeModule],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
