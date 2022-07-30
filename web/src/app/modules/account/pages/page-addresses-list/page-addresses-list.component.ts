import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/core/_models/user/Customer';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { UserService } from 'src/app/core/_services/user/user.service';

@Component({
    selector: 'app-page-addresses-list',
    templateUrl: './page-addresses-list.component.html',
    styleUrls: ['./page-addresses-list.component.sass']
})
export class PageAddressesListComponent implements OnInit {
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
    delete(id:number){
        this.user.addresses.splice(id,1);
        this.userService.updateCustomer(this.user._id,this.user).subscribe(data=>{})
    }
}
