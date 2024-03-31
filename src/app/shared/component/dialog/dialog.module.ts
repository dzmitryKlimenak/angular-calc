import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, FontAwesomeModule, MatButtonModule, MatDialogModule],
  exports: [DialogComponent],
})
export class DialogModule {}
