import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/core/_models/Article';

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
    relatedProducts$: Observable<Product[]>;

    product: Article;
    layout: 'standard'|'columnar'|'sidebar' = 'standard';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.layout = data.layout || this.layout;
            this.sidebarPosition = data.sidebarPosition || this.sidebarPosition;
            this.product = data.product;

        });
    }
}
