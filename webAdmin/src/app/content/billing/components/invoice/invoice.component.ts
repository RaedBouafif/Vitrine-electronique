import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Order } from '@app/core/_models/Order';
import { OrderService } from '@app/core/_services/order/order.service';
import { UserService } from '@app/core/_services/user/user.service';
import { ArticleService } from '@app/core/_services/article/article.service';
import { Customer } from '@app/core/_models/user/Customer';
import { Article } from '@app/core/_models/Article';
import { environment } from '@env/environment';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { PaymentMethod, DeliveryMethod } from '@app/core/_models/Method';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'prx-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  invoice: Order = new Order();
  environment = environment;
  customer: Customer = new Customer();
  articles: Article[] = [];
  icons = {
    download: faDownload
  };

  payment: PaymentMethod = new PaymentMethod();
  delivery: DeliveryMethod = new DeliveryMethod();
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      this.getOrder(id);
    });
  }
  download() {
    const div = document.getElementById('htmlData');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(div, options)
      .then((canvas: any) => {
        var img = canvas.toDataURL('image/PNG');
        var doc = new jsPDF('p', 'mm', 'a4', 1);

        // Add image Canvas to PDF
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );

        return doc;
      })
      .then((doc: any) => {
        doc.save('commande-' + this.invoice.reference + '.pdf');
      });
  }

  /* download() {
    this.pdfmake.create();
    this.pdfmake.configureStyles({
      header: { fontSize: 18, bold: true, alignment: 'right' },
      tableHeader: { bold: true }
    });
    if (this.invoice.status === 'validated') {
      this.pdfmake.addText('Facture', 'header');
    } else {
      this.pdfmake.addText('Bon de commande', 'header');
    }
    this.pdfmake.addText('Tunisie Accastillage', { fontSize: 16, bold: true });
    this.pdfmake.addText(
      this.customer.firstname + ' ' + this.customer.lastname,
      { fontSize: 14, alignment: 'right' }
    );
    this.pdfmake.addText(this.invoice.deliveryAddress, {
      fontSize: 14,
      alignment: 'right'
    });
    this.pdfmake.addText(this.customer.phoneNumber, {
      fontSize: 14,
      alignment: 'right'
    });
    this.pdfmake.addLineBreak();
    this.pdfmake.addText(
      'Date:' + new Date(this.invoice.orderDate).toDateString()
    );
    this.pdfmake.addLineBreak();
    const header1 = new Cell('Reference', 'tableHeader');
    const header2 = new Cell('Produit', 'tableHeader');
    const header3 = new Cell('Quantite', 'tableHeader');
    const header4 = new Cell('PU', 'tableHeader');
    const header5 = new Cell('SousTotal', 'tableHeader');

    const headerRows = new Row([header1, header2, header3, header4, header5]);
    let tab: Row[] = [];
    this.invoice.details.forEach(item => {
      let a = this.showArticle(item.article);
      item.unitPrice;
      const row = new Row([
        new Cell(a.reference),
        new Cell(a.title),
        new Cell(item.quantity + ''),
        new Cell(item.unitPrice + ' TND'),
        new Cell((item.quantity as any) * (item.unitPrice as any) + ' TND')
      ]);
      tab.push(row);
    });
    const row2 = new Row([
      new Cell('', { fillColor: '#cecece' }),
      new Cell('', { fillColor: '#cecece' }),
      new Cell('', { fillColor: '#cecece' }),
      new Cell('Total', 'tableHeader'),
      new Cell(this.invoice.total + 'TND')
    ]);
    tab.push(row2);
    const widths = ['*', '*', '*', '*', '*', '*'];
    const table = new Table(headerRows, tab, widths);

    this.pdfmake.addTable(table);

    this.pdfmake.download('commande-' + this.invoice.reference);
    setTimeout(() => {}, 5000);
  } */
  getCustomer() {
    this.userService.getCustomer(this.invoice.customer).subscribe(data => {
      this.customer = data;
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
  getArticles() {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
    });
  }
  showArticle(id: string): Article {
    let article = this.articles.find(item => item._id === id);
    return article;
  }
  getOrder(id: string) {
    this.orderService.getOrder(id).subscribe(data => {
      this.invoice = data;
      this.getCustomer();
      this.getArticles();
      this.getPayment();
      this.getDelivery();
    });
  }
}
