import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay } from 'rxjs';
import { INotificationData } from '../../interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSub: BehaviorSubject<INotificationData> = new BehaviorSubject(null);

  public notification$: Observable<INotificationData> = this.notificationSub
    .asObservable()
    .pipe(filter(Boolean), shareReplay({ bufferSize: 1, refCount: true }));

  constructor() {}

  public showNotification(data: INotificationData): void {
    this.notificationSub.next(data);
  }
}
