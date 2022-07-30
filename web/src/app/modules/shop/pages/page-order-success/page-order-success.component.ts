import { Component } from '@angular/core';
import { RootService } from '../../../../shared/services/root.service';
import { Customer } from 'src/app/core/_models/user/Customer';
import { OrderService } from 'src/app/core/_services/order/order.service';
import { Order } from 'src/app/core/_models/Order';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/_services/user/user.service';
import { PaymentMethod, DeliveryMethod } from 'src/app/core/_models/Method';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { Article } from 'src/app/core/_models/Article';

@Component({
    selector: 'app-page-order-success',
    templateUrl: './page-order-success.component.html',
    styleUrls: ['./page-order-success.component.scss']
})
export class PageOrderSuccessComponent {
    order: Order = new Order();
    user:Customer=new Customer()
    payment:PaymentMethod=new PaymentMethod()
    delivery:DeliveryMethod=new DeliveryMethod()
    products:Article[]=[];
    constructor(
        public root: RootService,
        private _router: ActivatedRoute,
        private userService:UserService,
        private orderService:OrderService,
        private articleService:ArticleService
    ) { }
    ngOnInit(): void {
        this._router.params.subscribe(params =>{
            let id=params['order'];
            this.getOrder(id)
            this.getArticles()
        });
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
