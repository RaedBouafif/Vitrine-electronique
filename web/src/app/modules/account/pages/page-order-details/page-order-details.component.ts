import { Component } from '@angular/core';
import { Order } from 'src/app/core/_models/Order';
import { Customer } from 'src/app/core/_models/user/Customer';
import { PaymentMethod, DeliveryMethod } from 'src/app/core/_models/Method';
import { Article } from 'src/app/core/_models/Article';
import { RootService } from 'src/app/shared/services/root.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/_services/user/user.service';
import { OrderService } from 'src/app/core/_services/order/order.service';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { orderStatus } from 'src/app/core/_data/orderStatus';

@Component({
    selector: 'app-page-order-details',
    templateUrl: './page-order-details.component.html',
    styleUrls: ['./page-order-details.component.scss']
})
export class PageOrderDetailsComponent {
    order: Order = new Order();
    user:Customer=new Customer()
    payment:PaymentMethod=new PaymentMethod()
    delivery:DeliveryMethod=new DeliveryMethod()
    products:Article[]=[];
    status = orderStatus;
    constructor(
        public root: RootService,
        private _router: ActivatedRoute,
        private userService:UserService,
        private orderService:OrderService,
        private articleService:ArticleService
    ) { }
    ngOnInit(): void {
        this._router.params.subscribe(params =>{
            let id=params['orderId'];
            this.getOrder(id)
            this.getArticles()
        });
    }
    getStatus(status: string) {
        let object = this.status.find(item => item.id === status);
        return object.name;
      }
    getArticles(){
        this.articleService.getAllArticles().subscribe(data=>{
            this.products=data;
        })
    }
    getOrder(id:string){
        this.orderService.getOrder(id).subscribe(data=>{
            this.order = data;
            this.getUser(data.customer)
            this.getPayment(data.paymentMethod);
            this.getDelivery(data.deliveryMethod);
        })
    }
    getProduct(id:string){
        return this.products.find(item=>item._id===id)
    }
    getUser(id:string){
        this.userService.getCustomer(id).subscribe(response=>{
            this.user=response;
            
        })

    }
    getPayment(id:string){
        this.orderService.getPaymentMethod(id).subscribe(data=>{
            this.payment=data
        })
    }
    getDelivery(id:string){
        this.orderService.getDeliveryMethod(id).subscribe(data=>{
            this.delivery=data
        })
    }
}
