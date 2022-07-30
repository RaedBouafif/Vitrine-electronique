import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faLongArrowAltLeft,
  faReply,
  faReplyAll,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { Message, Mail } from '@app/core/_models/messaging';
import { environment } from '@env/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from '@app/core/_services/messaging/message.service';

@Component({
  selector: 'prx-inbox-details',
  templateUrl: './inbox-details.component.html',
  styleUrls: ['./inbox-details.component.scss']
})
export class InboxDetailsComponent implements OnInit {
  reply = '';
  openReply = false;
  editor = ClassicEditor;
  icons = {
    longArrowAltLeft: faLongArrowAltLeft,
    reply: faReply,
    replyAll: faReplyAll,
    trashAlt: faTrashAlt
  };

  @Input()
  email: Message;

  @Output()
  returnToList: EventEmitter<boolean> = new EventEmitter<boolean>();

  get user(): any {
    const from = this.email.sender;

    return {
      email: from.mail,
      avatar: {
        name: from.name,
        picture: environment.assets + 'img/icons/profile-placeholder.png'
      }
    };
  }
  constructor(private messageService: MessageService) {}

  ngOnInit() {}
  deleteMessage() {
    this.messageService.deleteMessage(this.email._id).subscribe(data => {
      this.triggerReturnToList();
    });
  }
  replyToMail() {
    this.email.reply = this.reply;
    this.messageService
      .updateMessage(this.email._id, this.email)
      .subscribe(data => {
        console.log(data);
        this.sendMail(data);
      });
  }
  sendMail(message: Message) {
    let mail = new Mail(
      message.sender.mail,
      'Re:' + message.subject,
      message.reply
    );
    this.messageService.SendMail(mail).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  triggerReturnToList() {
    this.returnToList.emit(true);
  }
}
