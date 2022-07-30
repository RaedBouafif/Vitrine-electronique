import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartItem } from '../interfaces/cart-item';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { tva } from 'src/app/core/_data/orderStatus';
import { Article } from 'src/app/core/_models/Article';
import { prependListener } from 'process';


interface CartData {
    items: CartItem[];
    quantity: number;
    total: number;
    totalTTC:number
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private data: CartData = {
        items: [],
        quantity: 0,
        total: 0,
        totalTTC:0
    };

    private itemsSubject$: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.data.items);
    private quantitySubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.quantity);
    private totalSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.total);
    private totalTTCSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.totalTTC);
    private onAddingSubject$: Subject<Article> = new Subject();

    get items(): ReadonlyArray<CartItem> {
        this.calc()
        return this.data.items;
    }

    get quantity(): number {
        return this.data.quantity;
    }

    readonly items$: Observable<CartItem[]> = this.itemsSubject$.asObservable();
    readonly quantity$: Observable<number> = this.quantitySubject$.asObservable();

    readonly total$: Observable<number> = this.totalSubject$.asObservable();

    readonly totalTTC$: Observable<number> = this.totalTTCSubject$.asObservable();

    readonly onAdding$: Observable<Article> = this.onAddingSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID)
        private platformId: any
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
            this.calc();
        }
    }

    add(product: Article, quantity: number, options: {name: string; value: string}[] = []): Observable<CartItem> {
        // timer only for demo
        return timer(1000).pipe(map(() => {
            this.onAddingSubject$.next(product);

            let item = this.items.find(eachItem => {
                if (eachItem.product._id !== product._id ) {
                    return false;
                }


                return true;
            });

            if (item) {
                item.quantity += quantity;
            } else {
                let price = 0;
                let priceTTC = 0;
                let tax = product.tax ? product.tax : 0.18;
                priceTTC = product.price + product.price * tax;
            if(product.discount.onDiscount){
                priceTTC = priceTTC - (priceTTC*product.discount.percentage)/100;
                price = product.price - (product.price*product.discount.percentage)/100;
            }else {price=product.price}
                item = {product, quantity, options,price,priceTTC};

                this.data.items.push(item);
            }

            this.save();
            this.calc();

            return item;
        }));
    }

    update(updates: {item: CartItem, quantity: number}[]): Observable<void> {
        // timer only for demo
        return timer(1000).pipe(map(() => {
            updates.forEach(update => {
                const item = this.items.find(eachItem => eachItem === update.item);

                if (item) {
                    item.quantity = update.quantity;
                }
            });

            this.save();
            this.calc();
        }));
    }

    remove(item: CartItem): Observable<void> {
        // timer only for demo
        return timer(1000).pipe(map(() => {
            this.data.items = this.data.items.filter(eachItem => eachItem !== item);

            this.save();
            this.calc();
        }));
    }

    private calc(): void {
        let quantity = 0;
        let subtotal = 0;
        let subtotalTTC = 0;

        this.data.items.forEach(item => {
            quantity += item.quantity;
            subtotal += item.price * item.quantity;
            subtotalTTC += item.priceTTC * item.quantity;
        });



        const total = subtotal 
        const totalTTC = subtotalTTC

        this.data.quantity = quantity;
        this.data.total = total;
        this.data.totalTTC=totalTTC
        this.itemsSubject$.next(this.data.items);
        this.quantitySubject$.next(this.data.quantity);
        this.totalSubject$.next(this.data.total);
        this.totalTTCSubject$.next(this.data.totalTTC);
    }

    private save(): void {
        localStorage.setItem('cartItems', JSON.stringify(this.data.items));
    }

    private load(): void {
        const items = localStorage.getItem('cartItems');

        if (items) {
            this.data.items = JSON.parse(items);
        }
    }
    delete(): void {
        
            this.data.items = []
            this.save()
            this.calc()
        
    }
}
