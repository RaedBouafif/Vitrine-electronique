import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-header-menu-apps',
  templateUrl: './header-menu-apps.component.html',
  styleUrls: ['./header-menu-apps.component.scss']
})
export class HeaderMenuAppsComponent extends BaseComponent implements OnInit {
  apps: any[];

  constructor() {
    super();
  }

  ngOnInit() {
    this.apps = [
      { name: 'Calendar', route: '/calendar/basic-calendar', icon: 'calendar' },
      { name: 'Inbox', route: '/inbox', icon: 'inbox' },
      { name: 'Billing', route: '/billing/invoice', icon: 'file-text' },
      { name: 'Payments', route: '', icon: 'credit-card' },
      { name: 'To-do', route: '', icon: 'check-square' },
      { name: 'Contacts', route: '', icon: 'users' }
    ];
  }

  onOpenChange(status: boolean) {
    // Drop down is open => status
  }
}
