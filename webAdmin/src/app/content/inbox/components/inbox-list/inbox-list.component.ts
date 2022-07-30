import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Logger, BaseComponent } from '@app/core';
import { Message } from '@app/core/_models/messaging';
import { MessageService } from '@app/core/_services/messaging/message.service';
const logger = new Logger('InboxListComponent');

@Component({
  selector: 'prx-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss']
})
export class InboxListComponent extends BaseComponent implements OnInit {
  messages: Message[] = [];
  selectedMessage: Message;

  @Output()
  emailSelected: EventEmitter<Message> = new EventEmitter<Message>();

  constructor(private messageService: MessageService) {
    super();
  }

  ngOnInit() {
    this.messageService
      .getMessages()
      .pipe()
      .subscribe((messages: Message[]) => {
        this.isLoading = false;
        this.messages = messages;
      });
  }
  readMessage(message: Message) {
    if (message && message.read === false) {
      message.read = true;
      this.messageService.readMessage(message._id).subscribe(data => {
        console.log(data);
      });
    }
  }
  displayMessage(message: Message) {
    this.selectedMessage = message;
    this.readMessage(this.selectedMessage);
    this.emailSelected.emit(message);

    logger.debug(this.selectedMessage);
  }
}
