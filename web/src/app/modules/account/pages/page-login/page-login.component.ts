import { Component } from '@angular/core';
import { Customer, Address } from 'src/app/core/_models/user/Customer';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { MessageService } from 'src/app/core/_services/messaging/message.service';
import { Message, Mail } from 'src/app/core/_models/messaging';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { SocialAuthService} from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {

          /*
  0 : no error
  1:signin mail or password invalid
  2:signin account not verified
  3:signup mail exists in database
  4:signup error
  5:signin success
  6:password
  */
 message=0;
    user:Customer=new Customer();
    address:Address = new Address();
    passwordConfirm="";
    form: FormGroup;
    error: string;
    constructor(private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private messageService:MessageService,
        private _router: Router,
        private _location:Location,
        private authService: SocialAuthService
        ) {this.createForm(); }

    private createForm() {
        this.form = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          remember: false
        });
      }
    onPaste(event: ClipboardEvent) {
        event.preventDefault()
       }
  checkPassword(type){
         this.message=0;
         if(type===0 && this.passwordConfirm!="" && this.user.password !== this.passwordConfirm  ){
          this.message=6;
         }
         if(type===1 && this.user.password!="" && this.user.password !== this.passwordConfirm  ){
          this.message=6;
         }
         
   }
   check(mail){
    if(mail !== ''){
   this.userService.getCustomerByMail(mail).subscribe(data=>{
     let value = data as any
       if(data){
         this.message=3;
         return false;
       }
       else {
         this.message=0
         return true;
       }
     
   })}
 
 }
     /**
   * Logs-in the user
   * @param form The form value: user + password
   */
  log({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.userService.getCutstomerByLoginAndPassword(value.username, value.password)
        .subscribe(
          res => {
            if (res) {
             if(res.mailVerified===false){
                 this.message=2
             }
             else {
                this.message=0;
                value.object = res;
                this.authenticationService
                  .login(value)
                  .subscribe(
                    credentials => {
                      this._location.back()
                    },
                    error => {
                      this.error = error;
                    }
                  );
             }
              
            } else {
              this.message=1
            }
          },
          error => {
            this.message=1
          }
        );
    } 
  }
  submit(form:NgForm){
    if(form.valid){
        this.user.addresses.push(this.address)
        this.userService.createCustomer(this.user).subscribe(response=>{
            if(response){
                this.sendMail(response.data,response.token)
                this.message=5
                form.reset();
            }
            else {
                this.message=4;
            }
        })
    }
  }
  sendMail(customer:Customer,token:string){
    let body = '<div style="max-width: 1000;margin:auto;text-align:center" >'+
    '<h3 style="margin-top:5%;color:#6861e1">Activer votre compte </h3>'+
    '<p>Pour activer votre compte, veuillez cliquer sur le lien ci dessous </p>'+
    '<p><a href="' + location.origin + '/account/confirmation/'+token+'/'+customer.mail+'"> Lien d\'activation </a></p>'+
    '<hr style="width: 50%;"><p>Ceci est un mail automatique, Merci de ne pas y répondre.</p></div>';
    let mail = new Mail(customer.mail,"Tunisie Accastillage - Confirmation Compte",body);
    this.messageService.SendMail(mail).subscribe(data=>{})
  }

  /* social */
  signWithSocial(social,action): void {
 
    let provider = (social==='FB')?FacebookLoginProvider.PROVIDER_ID:GoogleLoginProvider.PROVIDER_ID; 
    let type = (social==='FB')?"facebook":"google"; 
  
    this.authService.signIn(provider).then(user => {
      (action==='IN')?this.signinSocial(user):this.signupSocial(user,type)
    });
    
  }
  signinSocial(user:SocialUser){
    this.user.login=user.email;this.user.password=user.id
    
    this.userService.getCutstomerByLoginAndPassword(user.email, user.id)
    .subscribe(
      res => {
        if (res) {
            this.message=0;
            let value = { username: res.login,password: res.password,remember: true, object: res}
            this.authenticationService
              .login(value)
              .subscribe(
                credentials => {
                  this._location.back()
                },
                error => {
                  this.error = error;
                }
              );
         
          
        } else {
          this.message=1
        }
      },
      error => {
        this.message=1
      }
    );
} 
    
   
   
   signupSocial(user:SocialUser,type){
     let u = new Customer()
    u.firstname=user.firstName;
    u.lastname=user.lastName;
    u.mail=user.email;
    u.login=user.email;
    u.password=user.id;
    u.accountType=type;
   
    this.check(u.mail)
    setTimeout(() => {
      if(this.message===0){
        this.userService.addCustomer(u).subscribe(res=>{
          if(res){
            this.message=0;
                let value = { username: res.login,password: res.password,remember: true, object: res}
                this.authenticationService
                  .login(value)
                  .subscribe(
                    credentials => {
                      this._location.back()
                    },
                    error => {
                      this.error = error;
                    }
                  );
          }
          else {
              this.message=4;
          }
      })
      }
    
    }, 1000);
    

   
   }
}
