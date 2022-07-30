import { Component } from '@angular/core';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { OrderService } from 'src/app/core/_services/order/order.service';
import { Order } from 'src/app/core/_models/Order';
import { orderStatus } from 'src/app/core/_data/orderStatus';

@Component({
    selector: 'app-page-orders-list',
    templateUrl: './page-orders-list.component.html',
    styleUrls: ['./page-orders-list.component.sass']
})
export class PageOrdersListComponent {
    orders: Order[]=[];
    allOrders :Order[]=[];
    page=5;
    pages=0;
     status = orderStatus;
    constructor(
        private credentialsService: CredentialsService,
        private orderService:OrderService
        ) { }
    ngOnInit(): void {
        if(this.credentialsService.isAuthenticated()){
            let credential = this.credentialsService.credentials;
            console.log(credential)
            this.getOrders(credential.accessToken)
        }
    }
    getOrders(id:string){
        this.orderService.getCustomerOrders(id).subscribe(data=>{
            this.allOrders=data.reverse()
            this.pages=Math.ceil(data.length/this.page);
            this.orders=this.allOrders.slice(0,this.page)
        })
    }
    getStatus(status: string) {
        let object = this.status.find(item => item.id === status);
        return object.name;
      }
      display(event){
        this.orders=this.allOrders.slice(this.page*event-1,this.page*event)
      }
}

