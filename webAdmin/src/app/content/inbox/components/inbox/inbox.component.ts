import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';

import { Logger } from '@app/core';
import { Message } from '@app/core/_models/messaging';
import { InboxListComponent } from '../inbox-list/inbox-list.component';
const logger = new Logger('InboxComponent');

@Component({
  selector: 'prx-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  @ViewChild(InboxListComponent, { static: false }) list: InboxListComponent;
  selectedEmail: Message;

  @HostBinding('class.email-loaded')
  get isSelectedEmail(): boolean {
    return this.selectedEmail !== undefined;
  }

  constructor() {}

  ngOnInit() {}

  onEmailSelected(message: Message) {
    logger.debug('Selected Email', message);
    this.selectedEmail = message;
  }

  onReturnToList(returned: boolean) {
    this.list.ngOnInit();
    logger.debug('Returning to List', returned);
    if (returned) {
      this.selectedEmail = undefined;
    }
  }
}
