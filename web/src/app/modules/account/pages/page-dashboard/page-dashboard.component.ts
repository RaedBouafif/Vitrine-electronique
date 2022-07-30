import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/_services/user/user.service';
import { Customer, Address } from 'src/app/core/_models/user/Customer';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { OrderService } from 'src/app/core/_services/order/order.service';
import { Order } from 'src/app/core/_models/Order';
import { orderStatus } from 'src/app/core/_data/orderStatus';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.sass']
})
export class PageDashboardComponent implements OnInit {
    address: Address = new Address()
    orders: Order[]=[]
    status = orderStatus;
    user:Customer=new Customer()
    constructor(
        private credentialsService: CredentialsService,
        private userService:UserService,
        private orderService:OrderService
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
            this.address = this.user.addresses[0];
            this.getOrders(id)
        })

    }
    getOrders(id:string){
        this.orderService.getCustomerOrders(id).subscribe(data=>{
            this.orders=data.reverse().slice(0,3)
        })
    }
    getStatus(status: string) {
        let object = this.status.find(item => item.id === status);
        return object.name;
      }
}
