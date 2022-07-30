import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification';
import { NotificationsService } from '../../../services/notifications.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Logger, BaseComponent } from '@app/core';

const logger = new Logger('HeaderMenuNotificationsComponent');

@Component({
  selector: 'prx-header-menu-notifications',
  templateUrl: './header-menu-notifications.component.html',
  styleUrls: ['./header-menu-notifications.component.scss']
})
export class HeaderMenuNotificationsComponent extends BaseComponent
  implements OnInit {
  protected loaded: boolean = false;

  iconClose = faTimes;
  notifications: Notification[];

  constructor(private notificationService: NotificationsService) {
    super();

    this.isLoading = true;
  }

  ngOnInit() {}

  onOpenChange(status: boolean) {
    if (status && !this.loaded) {
      this.loaded = !this.loaded;

      this.notificationService
        //
        .getLatestNotifications()
        .subscribe(notifications => {
          logger.debug('Notifications', notifications);

          this.isLoading = false;
          this.notifications = notifications;
        });
    }
  }
}
