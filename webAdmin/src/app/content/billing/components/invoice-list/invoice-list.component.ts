import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@app/core';
import {
  faDownload,
  faEye,
  faBell,
  faTrashAlt,
  faList,
  faTable,
  faCalendarAlt,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '@app/core/_services/order/order.service';
import { Order } from '@app/core/_models/Order';
import { orderStatus } from '@app/core/_data/orderStatus';
import { PaginationComponent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'prx-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends BaseComponent implements OnInit {
  icons = {
    download: faDownload,
    eye: faEye,
    bell: faBell,
    trash: faTrashAlt,
    calendar: faCalendarAlt,
    ok: faCheck,
    no: faTimes
  };

  views = {
    table: faTable,
    list: faList
  };
  currentPage: number = 1;
  itemsPerPage = 7;
  totalPages = 0;
  orders: Order[];
  invoices: Order[];
  status = orderStatus;

  @ViewChild('test', { static: false })
  table: PaginationComponent;
  constructor(private orderService: OrderService) {
    super();
  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((invoices: Order[]) => {
      this.isLoading = false;
      this.orders = invoices.reverse();
      this.totalPages = this.orders.length;
      this.invoices = this.orders.slice(0, this.itemsPerPage);
    });
  }
  pageChanged(event: any): void {
    console.log(event.page);
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.invoices = this.orders.slice(startItem, endItem);
  }
  getStatus(status: string) {
    let object = this.status.find(item => item.id === status);
    return object;
  }
  onShown(invoice: Order) {
    /* this.orderService.getOrder(invoice._id).subscribe(response => {
      invoice.items = response.items;
    }); */
  }
  update(invoice: Order, status: string) {
    invoice.status = status;
    this.updateOrder(invoice);
  }
  payed(invoice: Order) {
    invoice.paymentStatus = true;
    this.updateOrder(invoice);
  }
  updateOrder(invoice: Order) {
    this.orderService.updateOrder(invoice).subscribe(data => this.ngOnInit());
  }
}
