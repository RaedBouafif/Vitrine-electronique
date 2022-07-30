import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/_services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/_services/messaging/message.service';
import { Mail } from 'src/app/core/_models/messaging';
import { Customer } from 'src/app/core/_models/user/Customer';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
    selector: 'app-account-conf',
    templateUrl: './page-account-confirmation.component.html',
    styleUrls: ['./page-account-confirmation.component.scss']
})
export class PageAccountConfirmationComponent implements OnInit{
    code=null;
    constructor(
        private userService:UserService,
        private messageService:MessageService,
        private _router: ActivatedRoute
        ,private location: Location,
        private authenticationService: AuthenticationService,
        private router: Router,
        ) { }
    ngOnInit(): void {
        this._router.params.subscribe(params => this.getResponse(params['token'],params['mail']));
    }
    getResponse(token:string,mail:string){
        this.location.replaceState(Location.joinWithSlash('account','confirmation'))
        this.userService.confirmMail(token).subscribe(data=>{
            console.log(data)
            this.code=data.code;
            switch(data.code){
                case 0:{this.getCustomer(mail);break;}
                case 1:{this.sendSuccesMail(mail);this.getCustomer(mail);break;}
                case 2:this.sendErrorMail(mail);break;

            }
        })
    }
    getCustomer(mail:string){
        this.userService.getCustomerByMail(mail).subscribe(data=>{
            let value = {username:data.login,password:data.password,object:data,remember: false}
            this.authenticationService
            .login(value)
            .subscribe(
              credentials => {
               
              },
              error => {
                
              }
            );
        })
    }
    sendSuccesMail(mail:string){
        let body = '<div style="max-width: 1000;margin:auto;text-align:center" >'+
    '<h3 style="margin-top:5%;color:#6861e1">Bienvenue </h3>'+
    '<p>Votre Compte a été confirmée avec succès </p>'+
    '<hr style="width: 50%;"><p>Ceci est un mail automatique, Merci de ne pas y répondre.</p></div>';
    let email = new Mail(mail,"Tunisie Accastillage - Bienvenue",body);
    this.messageService.SendMail(email).subscribe(data=>{})

    }
    sendErrorMail(mail:string){
        this.userService.getCustomerByMail(mail).subscribe(data=>{
            if(data){
                this.generateToken(data)
            }
        })

    }
    generateToken(customer:Customer){
        this.userService.newToken(customer._id).subscribe((response:any)=>{
            let body = '<div style="max-width: 1000;margin:auto;text-align:center" >'+
    '<h3 style="margin-top:5%;color:#6861e1">Activer votre compte </h3>'+
    '<p>Pour activer votre compte, veuillez cliquer sur le lien ci dessous </p>'+
    '<p><a href="' + location.origin + '/account/confirmation/'+response.token+'/'+customer.mail+'"> Lien d\'activation </a></p>'+
    '<hr style="width: 50%;"><p>Ceci est un mail automatique, Merci de ne pas y répondre.</p></div>';
         let mail = new Mail(customer.mail,"Tunisie Accastillage - Confirmation Compte",body);
          this.messageService.SendMail(mail).subscribe(data=>{})
    })
    }
}
