import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/core/_models/Article';

@Injectable({
    providedIn: 'root'
})
export class QuickviewService implements OnDestroy {
    private destroy$: Subject<void> = new Subject();
    private showSubject$: Subject<Article> = new Subject();

    show$: Observable<Article> = this.showSubject$.pipe(takeUntil(this.destroy$));

    constructor() { }

    show(product: Article): Observable<void> {
        // timer only for demo
        return timer(1000).pipe(map(() => {
            this.showSubject$.next(product);
        }));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
