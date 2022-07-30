import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { CategoryService } from 'src/app/core/_services/category/category.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryResolverService implements Resolve<any> {
    constructor(
        private root: RootService,
        private router: Router,
        private category:CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const categorySlug = route.params.categorySlug || route.data.categorySlug || null;

        if (categorySlug === null) {
            return null;
        }

        return this.category.getCategory(categorySlug).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.router.navigateByUrl(this.root.notFound()).then();
                }

                return EMPTY;
            })
        );
    }
}
