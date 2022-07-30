import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ProductsList, ArticleList } from '../../../shared/interfaces/list';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { Article } from 'src/app/core/_models/Article';
import { ArticleService } from 'src/app/core/_services/article/article.service';

export function parseProductsListParams(params: Params): any {
    const options: any = {};

    if (params.page) {
        options.page = parseFloat(params.page);
    }
    if (params.limit) {
        options.limit = parseFloat(params.limit);
    }
    if (params.sort) {
        options.sort = params.sort;
    }

    for (const param of Object.keys(params)) {
        const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

        if (!mr) {
            continue;
        }

        const filterSlug = mr[1];

        if (!('filterValues' in options)) {
            options.filterValues = {};
        }

        options.filterValues[filterSlug] = params[param];
    }

    return options;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsListResolverService implements Resolve<Article[]> {
    constructor(
        private root: RootService,
        private router: Router,
        private article:ArticleService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> {
        const categorySlug = route.params.categorySlug || route.data.categorySlug || null;
        const subcategorySlug = route.params.subcategorySlug || route.data.subcategorySlug || null;
        let returnedValue:Observable<Article[]>=EMPTY;
        if(!categorySlug){
            returnedValue = this.article.getAllArticles().pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse && error.status === 404) {
                        this.router.navigate([this.root.notFound()]).then();
                    }
    
                    return EMPTY;
                })
            );
        }
        else {
            if(!subcategorySlug){
                returnedValue = this.article.getArticlesByCategory(categorySlug).pipe(
                    catchError(error => {
                        if (error instanceof HttpErrorResponse && error.status === 404) {
                            this.router.navigate([this.root.notFound()]).then();
                        }
        
                        return EMPTY;
                    })
                );
            }
            else {
                returnedValue = this.article.getArticlesBySubCategory(subcategorySlug).pipe(
                    catchError(error => {
                        if (error instanceof HttpErrorResponse && error.status === 404) {
                            this.router.navigate([this.root.notFound()]).then();
                        }
        
                        return EMPTY;
                    })
                );
            }
        }
        return returnedValue;
    }
}
