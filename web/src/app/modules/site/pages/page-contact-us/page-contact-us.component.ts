import { Component } from '@angular/core';
import { MessageService } from 'src/app/core/_services/messaging/message.service';
import { Message } from 'src/app/core/_models/messaging';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-contact-us',
    templateUrl: './page-contact-us.component.html',
    styleUrls: ['./page-contact-us.component.scss']
})
export class PageContactUsComponent {
    message:Message= new Message();
    error=false;
    isLoading: boolean;
    constructor(private messageService:MessageService) { this.isLoading = false; }

    send(form: NgForm) {
         
      if (form.valid) {
            this.isLoading = true;
          this.messageService
            .sendMessage(this.message)
            .subscribe(
              res => {
                this.isLoading=false
                if (res) {
                 form.reset()
                  this.error=false
                 
                } else {
                  this.error = true;
                }
              },
              error => {
                this.isLoading=false
                this.error = true;
              }
            );
        } 
      }
}
