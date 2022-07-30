import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { Article } from 'src/app/core/_models/Article';
import { ArticleService } from 'src/app/core/_services/article/article.service';



@Injectable({
    providedIn: 'root'
})
export class ProductsListDiscountResolverService implements Resolve<Article[]> {
    constructor(
        private root: RootService,
        private router: Router,
        private article:ArticleService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> {
        let returnedValue:Observable<Article[]>=EMPTY;
        
            returnedValue = this.article.getArticlesInDiscount().pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse && error.status === 404) {
                        this.router.navigate([this.root.notFound()]).then();
                    }
    
                    return EMPTY;
                })
            );
        
     
        return returnedValue;
    }
}
