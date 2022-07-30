import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { CartItem } from '../../../../shared/interfaces/cart-item';
import { RootService } from '../../../../shared/services/root.service';
import { ArticleService } from 'src/app/core/_services/article/article.service';
import { Article } from 'src/app/core/_models/Article';

@Component({
    selector: 'app-header-dropcart',
    templateUrl: './dropcart.component.html',
    styleUrls: ['./dropcart.component.scss']
})
export class DropcartComponent implements OnInit {
    removedItems: CartItem[] = []; 
    soldout=false;
    articles:Article[]=[]
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        public cart: CartService,
        public root: RootService,
        private product:ArticleService
    ) { }
    ngOnInit(): void {
        this.getProducts()
    }
    getProducts(){
        this.product.getAllArticles().subscribe(data=>{
            this.articles = data;
            this.cart.items.forEach(item=>{
                if(this.isSoldOut(item.product._id,item.quantity)){
                    this.soldout=true;
                }
            })
        })
    }
    isSoldOut(id:string,quantity:number){
        let product = this.articles.find(item=>item._id===id)
        if(product){ return (product.quantity < quantity)}
        else return false;
       
    }
    remove(item: CartItem): void {
        if (this.removedItems.includes(item)) {
            return;
        }

        this.removedItems.push(item);
        this.cart.remove(item).subscribe({complete: () => this.removedItems = this.removedItems.filter(eachItem => eachItem !== item)});
    }
}
