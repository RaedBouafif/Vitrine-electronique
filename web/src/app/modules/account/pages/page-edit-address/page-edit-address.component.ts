import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, Address } from 'src/app/core/_models/user/Customer';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-page-edit-address',
    templateUrl: './page-edit-address.component.html',
    styleUrls: ['./page-edit-address.component.scss']
})
export class PageEditAddressComponent implements OnInit {
    user:Customer=new Customer()
    edit=false;
    userAddress:Address=new Address()
    message: number;
    idAddress=null;
    constructor(
        private _router: ActivatedRoute,
        private route :Router,
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
            this._router.params.subscribe(params =>{
                let id=params['addressId'];
                if(id==='new'){
                    this.edit=false;
                }
                else {
                    this.edit=true;
                    this.userAddress = this.user.addresses[id];
                    this.idAddress = id;
                }
            });
        })

    }
    submit(form:NgForm){
        if(form.valid){
            if(this.edit){
                /* update address */
                this.user.addresses[this.idAddress]=this.userAddress;
            }
            else {
                /* new address */
                this.user.addresses.push(this.userAddress)
            }
            this.userService.updateCustomer(this.user._id,this.user).subscribe(response=>{
                if(response){
                    this.route.navigate(['/account/addresses'])
                }
                else {
                    this.message=2;
                }
            })
        }
      }

}
