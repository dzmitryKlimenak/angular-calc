import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private notifications: NotificationService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.notifications.notification$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this._snackBar.dismiss()),
      )
      .subscribe((notification) => {
        this._snackBar.open(notification?.title, notification?.description, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['notification__wrapper', notification?.type || 'info'],
        });
      });
  }
}
