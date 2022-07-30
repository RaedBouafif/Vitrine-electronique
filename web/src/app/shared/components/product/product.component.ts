import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { Article } from 'src/app/core/_models/Article';
import { CategoryService } from 'src/app/core/_services/category/category.service';
import { Category } from 'src/app/core/_models/Category/Category';
import { tva } from 'src/app/core/_data/orderStatus';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    @Input() layout: ProductLayout;

    @Input() product: Article;

    quantity: FormControl = new FormControl(1);

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    categories:Category[]=[]
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private cart: CartService,
        private categoryService:CategoryService
    ) { this.getCategories()}

    addToCart(): void {
        if (!this.addingToCart && this.product && this.quantity.value > 0) {
            this.addingToCart = true;

            this.cart.add(this.product, this.quantity.value).subscribe({complete: () => this.addingToCart = false});
        }
    }
    getPrice(artcile: Article) {
        let tax = artcile.tax ? artcile.tax : 0.18;
        return artcile.price + artcile.price * tax;
      }
      getPriceAfterDiscount(artcile: Article) {
        let percentage = artcile.discount.percentage / 100;
        return this.getPrice(artcile) - this.getPrice(artcile) * percentage;
      }
    getDescription(){
        if(this.product.description.length >= 500){
            return this.product.description.slice(0,500)+"..."
        }
        else {
            return this.product.description;
        }
    }
    getCategories(){
        this.categoryService.getAllCategorys().subscribe(data=>{
            this.categories=data
        })
    }
    getCategory(idC:string){
        let category=this.categories.find(item=>item._id===idC)
        if(category){return category.categoryName;}
        return "";
    }
    addToWishlist(): void {
        if (!this.addingToWishlist && this.product) {
            this.addingToWishlist = true;

          //  this.wishlist.add(this.product).subscribe({complete: () => this.addingToWishlist = false});
        }
    }

    addToCompare(): void {
        if (!this.addingToCompare && this.product) {
            this.addingToCompare = true;

         //   this.compare.add(this.product).subscribe({complete: () => this.addingToCompare = false});
        }
    }
}
