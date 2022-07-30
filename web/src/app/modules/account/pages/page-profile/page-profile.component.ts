import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/core/_models/user/Customer';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { OrderService } from 'src/app/core/_services/order/order.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent implements OnInit{
    user:Customer=new Customer()
    message: number=0;
    constructor(
        private credentialsService: CredentialsService,
        private userService:UserService
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
        })

    }
    submit(form:NgForm){
        if(form.valid){
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
            })
        }
      }
}
