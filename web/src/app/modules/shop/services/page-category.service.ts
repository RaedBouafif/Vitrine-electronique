import { EventEmitter, Injectable } from '@angular/core';
import { ProductsList,ArticleList } from '../../../shared/interfaces/list';
import { Product } from '../../../shared/interfaces/product';
import { Filter, SerializedFilterValues } from '../../../shared/interfaces/filter';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Article } from 'src/app/core/_models/Article';
import { Category, SubCategory } from 'src/app/core/_models/Category/Category';

export interface CategoryList {
    categories: Category[];
    category: Category;
    subCategory: SubCategory;
}
/**
 * This service serves as a mediator between the PageCategoryComponent, ProductsViewComponent and WidgetFiltersComponent components.
 */
@Injectable()
export class PageCategoryService {
    // isLoading
    private isLoadingState = false;
    private isLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoadingState);

    isLoading$: Observable<boolean> = this.isLoadingSource.asObservable();

    // list
    private listState: ArticleList;
    private listSource: BehaviorSubject<ArticleList> = new BehaviorSubject<ArticleList>(this.listState);

    list$: Observable<ArticleList> = this.listSource.pipe(filter(x => x !== null));
    // list C
    private listStateC: CategoryList;
    private listSourceC: BehaviorSubject<CategoryList> = new BehaviorSubject<CategoryList>(this.listStateC);

    listC$: Observable<CategoryList> = this.listSourceC.pipe(filter(x => x !== null));
    // options
    private optionsState: any = {};

    get options(): any {
        return this.optionsState;
    }

    optionsChange$: EventEmitter<any> = new EventEmitter<any>();

    // getters for list
    get items(): Article[] { return this.listState.items; }
    get page(): number { return this.listState.page; }
    get limit(): number { return this.listState.limit; }
    get sort(): string { return this.listState.sort; }
    get total(): number { return this.listState.total; }
    get pages(): number { return this.listState.pages; }
    get from(): number { return this.listState.from; }
    get to(): number { return this.listState.to; }

    get categories(): Category[] { return this.listStateC.categories; }
    get category(): Category { return this.listStateC.category; }
    get subcategory(): SubCategory { return this.listStateC.subCategory; }
   /*  get filters(): Filter[] { return this.listState.filters; }
    get filterValues(): SerializedFilterValues { return this.listState.filterValues; } */

    // set functions
    setIsLoading(value: boolean): void {
        this.isLoadingState = value;
        this.isLoadingSource.next(value);
    }
    setCategory(categories: Category[],categoryV?:Category,subCategoryV?:SubCategory): void {
        const category = categoryV || null;
        const subCategory = subCategoryV || null;
        this.listStateC = { categories,category,subCategory}
        this.listSourceC.next(this.listStateC);
    }
    set(list: Article[],pageV?:number,limitV?:number): void {
        const page = pageV || 1;
        const limit = limitV || 12;
        const start = (page - 1) * limit;
        const end = start + limit;
    
        const total = list.length;
        const pages = Math.ceil(total / limit);
        const from = (page - 1) * limit + 1;
        const to = Math.max(Math.min(page * limit, total), from);
        const sort = "default"
        const items = list.slice(start, end);
    
        const response: ArticleList = {
            items,
            page,
            limit,
            total,
            pages,
            from,
            to,sort
        }
        this.listState = response;
        this.listSource.next(this.listState); 
       
    }

    setOptions(options: any, emitEvent: boolean = true): void {
        const diff = this.optionsDiff(options);

        if ('limit' in diff || 'sort' in diff || 'filterValues' in diff) {
            options.page = 1;
        }

        this.optionsState = options;

        if (emitEvent && Object.keys(diff).length > 0) {
            this.optionsChange$.emit(diff);
        }
    }

    updateOptions(options: any, emitEvent: boolean = true): void {
        this.setOptions({...this.optionsState, ...options}, emitEvent);
    }

    /**
     * Returns only different options.
     */
    protected optionsDiff(curr: any): any {
        const result: any = {};

        ['page', 'limit', 'sort'].forEach(key => {
            if (key in curr && this[key] !== curr[key]) {
                result[key] = curr[key];
            }
        });

/*         if ('filterValues' in curr) {
            const filterValues = curr.filterValues;

            if (Object.keys(filterValues).length !== Object.keys(this.filterValues).length) {
                result.filterValues = {};
            }

            Object.keys(filterValues).forEach(key => {
                if (this.filterValues[key] !== filterValues[key]) {
                    if (!('filterValues' in result)) {
                        result.filterValues = {};
                    }

                    result.filterValues[key] = filterValues[key];
                }
            });
        } */

        return result;
    }
}
