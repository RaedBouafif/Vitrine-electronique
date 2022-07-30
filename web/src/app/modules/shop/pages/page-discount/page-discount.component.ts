import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { Link } from '../../../../shared/interfaces/link';
import { RootService } from '../../../../shared/services/root.service';
import { of, Subject, timer, Observable } from 'rxjs';
import { debounce, mergeMap, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { parseProductsListParams } from '../../resolvers/products-list-resolver.service';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { Article } from 'src/app/core/_models/Article';

@Component({
    selector: 'app-discount',
    templateUrl: './page-discount.component.html',
    styleUrls: ['./page-discount.component.scss'],
    providers: [
        {provide: PageCategoryService, useClass: PageCategoryService},
        {provide: ShopSidebarService, useClass: ShopSidebarService},
    ]
})
export class PageDiscountComponent implements OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    columns: 3|4|5 = 3;
    viewMode: 'grid'|'grid-with-features'|'list' = 'grid';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    breadcrumbs: Link[] = [];
    pageHeader: string;

    constructor(
        private root: RootService,
        private router: Router,
        private route: ActivatedRoute,
        private pageService: PageCategoryService,
        private location: Location,
        private article:ArticleService
    ) {
        this.route.data.subscribe(data => {
            this.breadcrumbs = [
                {label: 'Home', url: this.root.home()},
                {label: 'Produits en promotions', url: this.root.shop()+'discount'},
            ];
            this.pageHeader="Produits en promotions"
           
            this.pageService.set(data.products);

            this.columns = 'columns' in data ? data.columns : this.columns;
            this.viewMode = 'viewMode' in data ? data.viewMode : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data.sidebarPosition : this.sidebarPosition;
        });
        this.route.queryParams.subscribe(queryParams => {
            this.pageService.setOptions(parseProductsListParams(queryParams), false);
        });

        this.pageService.optionsChange$.pipe(
            debounce(changedOptions => {
                return changedOptions.filterValues ? timer(250) : of(changedOptions);
            }),
            mergeMap(() => {
                this.updateUrl();
                this.pageService.setIsLoading(true);
                return this.getArticles().pipe(
                    takeUntil(this.pageService.optionsChange$)
                );
            }),
            takeUntil(this.destroy$),
        ).subscribe(list => {
            this.pageService.set(list,this.pageService.options.page,this.pageService.options.limit);
            this.pageService.setIsLoading(false);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    updateUrl(): void {
        const tree = this.router.parseUrl(this.router.url);
        tree.queryParams = this.getQueryParams();
        this.location.replaceState(tree.toString());
    }

    getQueryParams(): Params {
        const params: Params = {};
        const options =  this.pageService.options;
        const filterValues = options.filterValues;

        if ('page' in options && options.page !== 1) {
            params.page = options.page;
        }
        if ('limit' in options && options.limit !== 12) {
            params.limit = options.limit;
        }
        if ('sort' in options && options.sort !== 'default') {
            params.sort = options.sort;
        }

        return params;
    }

    getArticles():Observable<Article[]>{
        let returnedValue:any=null;
            returnedValue = this.article.getArticlesInDiscount()
        
       
        return returnedValue;
    }
}
