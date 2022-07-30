import { Component, OnDestroy, OnInit,ViewChild} from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../../../../shared/services/root.service';
import { Customer } from 'src/app/core/_models/user/Customer';
import { CredentialsService } from 'src/app/core/authentication/credentials.service';
import { UserService } from 'src/app/core/_services/user/user.service';
import { OrderService } from 'src/app/core/_services/order/order.service';
import { PaymentMethod, DeliveryMethod } from 'src/app/core/_models/Method';
import { Order, OrderDetail } from 'src/app/core/_models/Order';
import { MessageService } from 'src/app/core/_services/messaging/message.service';
import { Mail } from 'src/app/core/_models/messaging';
import { Article } from 'src/app/core/_models/Article';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { CartItem } from 'src/app/shared/interfaces/cart-item';

@Component({
    selector: 'app-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    user:Customer=new Customer()
    paymentMethods:PaymentMethod[]=[];
    deliveryMethods:DeliveryMethod[]=[];
    addressV=0;
    order:Order=new Order();
    mail:string="";
    articles:Article[]=null;
    array=[];
    alertBody=[]
    constructor(
        public root: RootService,
        public cart: CartService,
        private route: ActivatedRoute,
        private router: Router,
        private credentialsService: CredentialsService,
        private userService:UserService,
        private orderService:OrderService,
        private messageService:MessageService,
        private articleService:ArticleService
    ) { }

    ngOnInit(): void {
        this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
            if (!quantity) {
                this.router.navigate(['../cart'], {relativeTo: this.route}).then();
            }
            else{
                this.cart.total$.subscribe(total=>this.order.total=total)
                this.cart.totalTTC$.subscribe(total=>this.order.totalTTC=total)
                this.cart.items$.subscribe(items=>{
                    this.order.details=[]
                    items.forEach(item=>{
                        let detail = new OrderDetail(item.product._id,item.quantity,item.priceTTC)
                        this.order.details.push(detail)
                    })
                })
            }
        });

        this.getPayment();
        this.getDelivery()
        this.getSettings();
        this.getProducts()
        if(this.credentialsService.isAuthenticated()){
            let credential = this.credentialsService.credentials;
            this.getUser(credential.accessToken)
        }
    }
    getProducts(){
        this.articleService.getAllArticles().subscribe(data=>{
            this.articles=data;
            this.cart.items.forEach(item=>{
                let productQty = data.find(pro=>pro._id===item.product._id).quantity;
                let newQty = productQty-item.quantity;
                if(newQty <= 2){this.alertBody.push(item.product.reference+":"+item.product.title)}
                this.array.push({article:item.product._id,qty:newQty})
            })
        })
    }
    getUser(id:string){
        this.userService.getCustomer(id).subscribe(response=>{
            this.user=response;
            this.order.customer=response._id;
        })

    }
    getSettings(){
        this.userService.getSettings().subscribe(data=>{
            this.mail=data.mailList.find(item=>item.name==="Email principal").mail;
        })
    }
    getPayment(){
        this.orderService.getAllPaymentMethods().subscribe(data=>{
            this.paymentMethods=data.filter(item=>item.active===true)
            this.order.paymentMethod=this.paymentMethods[0]._id
        })
    }
    getDelivery(){
        this.orderService.getAllDeliveryMethods().subscribe(data=>{
            this.deliveryMethods=data.filter(item=>item.active===true)
            this.order.deliveryMethod=this.deliveryMethods[0]._id
        })
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    submit(){
        let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        this.order.reference=random.toString();
        this.order.deliveryAddress=this.user.addresses[this.addressV].address+","+this.user.addresses[this.addressV].postalCode+","+this.user.addresses[this.addressV].city;
         this.orderService.addOrder(this.order).subscribe(data=>{
        this.sendMail(data.reference)
        this.updateQty()
        if(this.alertBody.length!==0){this.sendAlert(this.alertBody.join(','))}
            this.cart.delete()
            this.router.navigate(['/shop/cart/checkout/success/'+data._id])
        }) 
    }

    sendMail(ref:any){
        let payment=this.paymentMethods.find(item=>item._id===this.order.paymentMethod).name;
        let delivery=this.deliveryMethods.find(item=>item._id===this.order.deliveryMethod).name
        let body="<html><p>Client:"+this.user.firstname+" "+this.user.lastname+"</p><p>Adresse:"+this.order.deliveryAddress
        +"</p><p>Livraison:"+delivery+"</p><p>Paiement:"+payment+"</p>"
        +document.getElementById('table').innerHTML+"</html>"
        let newMail:Mail= new Mail(this.mail,"Nouvelle Commande "+ref,body);
        this.messageService.SendMail(newMail).subscribe(data=>{})
    }
    sendAlert(values){
        let body="<html>Les articles:"+values+" seront bientôt épuisée, vérifier votre stock </html>"
        let newMail:Mail= new Mail(this.mail,"Alerte Stock",body);
        this.messageService.SendMail(newMail).subscribe(data=>{})
    }
    updateQty(){
        this.articleService.updateArticlesQty(this.array).subscribe(data=>console.log(data))
    }
}
