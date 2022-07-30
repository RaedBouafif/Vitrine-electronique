import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { Avatar } from '@app/blocks/avatars/models/avatar';
import { Order } from '@app/core/_models/Order';
import { UserService } from '@app/core/_services/user/user.service';
import { Customer } from '@app/core/_models/user/Customer';
import { ArticleService } from '@app/core/_services/article/article.service';
import { Article } from '@app/core/_models/Article';
import { OrderService } from '@app/core/_services/order/order.service';
import { PaymentMethod, DeliveryMethod } from '@app/core/_models/Method';

@Component({
  selector: 'prx-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  @Input()
  invoice: Order;

  get avatar(): Avatar {
    return { name: this.customer.firstname };
  }
  customer: Customer = new Customer();
  articles: Article[] = [];
  payment: PaymentMethod = new PaymentMethod();
  delivery: DeliveryMethod = new DeliveryMethod();
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getArticles();
    this.getDelivery();
    this.getPayment();
    this.userService.getCustomer(this.invoice.customer).subscribe(data => {
      this.customer = data;
    });
  }
  getArticles() {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
    });
  }
  getPayment() {
    this.orderService
      .getPaymentMethod(this.invoice.paymentMethod)
      .subscribe(data => (this.payment = data));
  }
  getDelivery() {
    this.orderService
      .getDeliveryMethod(this.invoice.deliveryMethod)
      .subscribe(data => (this.delivery = data));
  }
  showArticle(id: string): Article {
    let article = this.articles.find(item => item._id === id);
    return article;
  }
}
