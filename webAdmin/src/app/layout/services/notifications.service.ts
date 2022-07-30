import { Injectable } from '@angular/core';
import { ApiService } from '@app/core';
import { Observable } from 'rxjs';

import { Notification } from '../models/notification';

const routes = {
  notifications: () => `/notifications`
};

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private api: ApiService) {}

  getLatestNotifications(): Observable<Notification[]> {
    return this.api.query<Notification>(routes.notifications(), Notification);
  }
}
