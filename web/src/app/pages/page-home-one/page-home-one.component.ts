import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';

import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';
import { takeUntil, tap,map } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/_services/category/category.service';
import { Category } from 'src/app/core/_models/Category/Category';
import { ArticleService } from 'src/app/core/_services/article/article.service';

interface ProductsCarouselGroup extends BlockHeaderGroup {
    products$: Observable<any[]>;
}

interface ProductsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    products: any[];
    groups: ProductsCarouselGroup[];
}

@Component({
    selector: 'app-home',
    templateUrl: './page-home-one.component.html',
    styleUrls: ['./page-home-one.component.scss']
})
export class PageHomeOneComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    popularCategories: Category[];

    latestProducts: ProductsCarouselData;

    constructor(
        private articleService: ArticleService,private categoryService:CategoryService
    ) { }
    getCategories(){
        this.categoryService.getAllCategorys().subscribe(data=>{
            this.popularCategories = data.filter(item=>item.active===true)
        })
    }
    ngOnInit(): void {
        this.getCategories()
        this.latestProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: '',
                    current: true,
                    products$: this.articleService.getAllArticles().pipe(map(x => x.reverse().slice(0, 10)))
                }
            ],
        };
        this.groupChange(this.latestProducts, this.latestProducts.groups[0]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ProductsCarouselGroup).products$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe(x => carousel.products = x);
    }
}
