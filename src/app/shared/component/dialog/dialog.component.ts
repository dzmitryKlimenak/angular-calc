import { Component, Input } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  protected readonly faWindowClose = faWindowClose;

  @Input() dialogTitle = '';

  private _width: string;

  @Input() set dialogWidth(value: number) {
    this._width = value ? `${value}px` : 'auto';
  }

  get width(): string {
    return this._width;
  }

  constructor(private dialogRef: MatDialogRef<any>) {}

  close(): void {
    this.dialogRef.close();
  }
}
