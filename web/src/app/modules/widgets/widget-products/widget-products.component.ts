import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { RootService } from '../../../shared/services/root.service';
import { Article } from 'src/app/core/_models/Article';

@Component({
    selector: 'app-widget-products',
    templateUrl: './widget-products.component.html',
    styleUrls: ['./widget-products.component.scss']
})
export class WidgetProductsComponent {
    @Input() header = '';
    @Input() products: Article[] = [];

    constructor(public root: RootService) { }
    getPrice(artcile: Article) {
        let tax = artcile.tax ? artcile.tax : 0.18;
        return artcile.price + artcile.price * tax;
      }
      getPriceAfterDiscount(artcile: Article) {
        let percentage = artcile.discount.percentage / 100;
        return this.getPrice(artcile) - this.getPrice(artcile) * percentage;
      }
}
