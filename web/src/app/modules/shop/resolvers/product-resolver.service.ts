import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { Article } from 'src/app/core/_models/Article';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<Article> {
    constructor(
        private root: RootService,
        private router: Router,
        private article:ArticleService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
        const productSlug = route.params.productSlug || route.data.productSlug;

        return this.article.getArticle(productSlug).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.router.navigate([this.root.notFound()]).then();
                }

                return EMPTY;
            })
        );
    }
}
