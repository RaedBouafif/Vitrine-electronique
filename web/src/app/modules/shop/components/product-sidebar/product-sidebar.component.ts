import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { Category } from '../../../../shared/interfaces/category';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-sidebar',
    templateUrl: './product-sidebar.component.html',
    styleUrls: ['./product-sidebar.component.sass']
})
export class ProductSidebarComponent implements OnInit {
    categories$: Observable<Category[]>;
    bestsellers$: Observable<Product[]>;

    constructor(
    ) { }

    ngOnInit() {
      
    }
}
