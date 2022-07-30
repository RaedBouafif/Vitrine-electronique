import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/core/_models/user/Customer';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-page-password',
    templateUrl: './page-password.component.html',
    styleUrls: ['./page-password.component.sass']
})
export class PagePasswordComponent implements OnInit {
    user:Customer=new Customer()
    message: number=0;
    error=0;
    currentPassword="";
    newPassword="";
    passwordConfirme="";
    constructor(
        private credentialsService: CredentialsService,
        private userService:UserService,
        private router:Router
        ) { }
    ngOnInit(): void {
        if(this.credentialsService.isAuthenticated()){
            let credential = this.credentialsService.credentials;
            this.getUser(credential.accessToken)
        }
    }
    getUser(id:string){
        this.userService.getCustomer(id).subscribe(response=>{
            this.user=response;
            if(response.accountType==='google' ||response.accountType==='facebook'){
                this.router.navigate(['/account/dashboard'])
            }
                })

    }
    onPaste(event: ClipboardEvent) {
        event.preventDefault()
       }
  checkPassword(type){
         this.message=0;
         if(type===0 && this.passwordConfirme!="" && this.newPassword !== this.passwordConfirme  ){
          this.message=3;
         }
         if(type===1 && this.newPassword!="" && this.newPassword!== this.passwordConfirme  ){
          this.message=3;
         }
         
   }
   check(){
    if(this.currentPassword !== '' && this.currentPassword!== this.user.password){
        this.error=1
    }
    else {this.error=0}
}
submit(form:NgForm){
    if(form.valid){
        this.user.password=this.newPassword;
        this.userService.updateCustomer(this.user._id,this.user).subscribe(response=>{
            if(response){
                this.message=1
                setTimeout(() => {
                    this.message=0
                }, 10000);
            }
            else {
                this.message=2;
            }
        },error=>this.message=2)
    }
  }
}