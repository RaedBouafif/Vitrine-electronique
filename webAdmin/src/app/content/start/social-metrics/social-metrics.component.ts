import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '@app/core';
import { MessageService } from '@app/core/_services/messaging/message.service';
import { UserService } from '@app/core/_services/user/user.service';
import { ArticleService } from '@app/core/_services/article/article.service';
import { OrderService } from '@app/core/_services/order/order.service';

@Component({
  selector: 'prx-social-metrics',
  templateUrl: './social-metrics.component.html',
  styleUrls: ['./social-metrics.component.scss']
})
export class SocialMetricsComponent extends BaseComponent implements OnInit {
  icons = {
    dw: faAngleDown,
    up: faAngleUp
  };

  metrics = [
    { title: 'Clients', icon: 'user', value: '0' },
    { title: 'Articles', icon: 'shopping-cart', value: '0' },
    { title: 'Commandes', icon: 'shopping-bag', value: '0' },
    { title: 'Nouveaux Messages', icon: 'message-square', value: '0' }
  ];
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private articleService: ArticleService,
    private orderService: OrderService
  ) {
    super();
  }

  ngOnInit() {
    this.getMessageCount();
    this.getCustomerCount();
    this.getArticlesCount();
    this.getOrderCount();
  }

  getCustomerCount() {
    this.userService
      .getAllCustomers()
      .subscribe(data => (this.metrics[0].value = data.length.toString()));
  }
  getArticlesCount() {
    this.articleService
      .getAllArticles()
      .subscribe(data => (this.metrics[1].value = data.length.toString()));
  }
  getOrderCount() {
    this.orderService
      .getAllOrders()
      .subscribe(data => (this.metrics[2].value = data.length.toString()));
  }
  getMessageCount() {
    this.messageService
      .getNewMessagesCount()
      .subscribe(data => (this.metrics[3].value = data));
  }
}
