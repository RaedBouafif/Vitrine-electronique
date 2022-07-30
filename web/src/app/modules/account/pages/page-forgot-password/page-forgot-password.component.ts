import { Component } from '@angular/core';
import { UserService } from 'src/app/core/_services/user/user.service';
import { MessageService } from 'src/app/core/_services/messaging/message.service';
import { Customer } from 'src/app/core/_models/user/Customer';
import { Mail } from 'src/app/core/_models/messaging';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './page-forgot-password.component.html',
    styleUrls: ['./page-forgot-password.component.scss']
})
export class PageForgotPasswordComponent {
    message=0;
    mail="";
    constructor(
        private userService:UserService,
        private messageService:MessageService
        ) { }

    submit(form:NgForm){
        if(form.valid){
            this.userService.getCustomerByMail(this.mail).subscribe(data=>{
                if(data){
                    this.updateCustomer(data)
                }
                else{
                    this.message=2
                }
            },
            error=>{
                this.message=2
            })
        }
       
    }
    updateCustomer(customer:Customer){
        let password = Math.random().toString(36).substr(2, 8);
        customer.password=password;
        this.userService.updateCustomer(customer._id,customer).subscribe(data=>{
            this.message=1
            this.sendMail(data)
        })
    }
    
    sendMail(customer:Customer){
        let body = '<div style="max-width: 1000;margin:auto;text-align:center" >'+
        '<h3 style="margin-top:5%;color:#6861e1">Nouveau mot de passe </h3>'+
        '<p>Votre nouvellle mot de passe est '+customer.password+' </p>'+
        '<hr style="width: 50%;"><p>Ceci est un mail automatique, Merci de ne pas y répondre.</p></div>';
        let mail = new Mail(customer.mail,"Tunisie Accastillage - Revouvelement de mot de passe",body);
        this.messageService.SendMail(mail).subscribe(data=>{})
    }
}
