import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Logger, BaseComponent } from '@app/core';
import { Message } from '@app/core/_models/messaging';
import { MessageService } from '@app/core/_services/messaging/message.service';

const logger = new Logger('HeaderMenuMessagesComponent');
@Component({
  selector: 'prx-header-menu-messages',
  templateUrl: './header-menu-messages.component.html',
  styleUrls: ['./header-menu-messages.component.scss']
})
export class HeaderMenuMessagesComponent extends BaseComponent
  implements OnInit {
  protected loaded: boolean = false;

  iconClose = faTimes;
  messages: Message[] = [];

  constructor(private messagesService: MessageService) {
    super();
    this.isLoading = true;
  }

  ngOnInit() {
    this.getMessages();
    setInterval(() => {
      this.getMessages();
    }, 3600000);
  }

  onOpenChange(status: boolean) {
    if (status && !this.loaded) {
      this.loaded = !this.loaded;
      this.getMessages();
    }
  }
  getMessages() {
    this.messagesService.getNewMessages().subscribe(messages => {
      logger.debug('Messages', messages);
      this.isLoading = false;
      this.messages = messages;
    });
  }
}
