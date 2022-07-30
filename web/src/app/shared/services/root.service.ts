import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { Brand } from '../interfaces/brand';

@Injectable({
    providedIn: 'root'
})
export class RootService {
    constructor() { }

    home(): string {
        return '/';
    }

    shop(): string {
        return `/shop/catalog`;
    }
    
    category(category: Partial<any>): string {
        if (category.type && category.type === 'shop') {
            const basePath = this.shop();

            if ('slug' in category) {
                return `${basePath}/${category.slug}`;
            }
            if ('id' in category) {
                return `${basePath}/${category.id}`;
            }

            throw Error('Provide category with "path", "slug" or "id".');
        }
        if (category.type && category.type === 'blog') {
            return this.blog();
        }
        if(!category.type){
            const basePath = this.shop();
            if ('_id' in category) {
                return `${basePath}/${category._id}`;
            }
        }

        throw Error('Provided category with unknown type.');
    }

    product(product: Partial<any>): string {
        const basePath = '/shop/products';

        if ('slug' in product) {
            return `${basePath}/${product.slug}`;
        }
        if ('id' in product) {
            return `${basePath}/${product.id}`;
        }
        if ('_id' in product) {
            return `${basePath}/${product._id}`;
        }

        throw Error('Provide product with "slug" or "id".');
    }

    brand(brand: Partial<Brand>): string {
        return '/';
    }

    cart(): string {
        return '/shop/cart';
    }

    checkout(): string {
        return '/shop/cart/checkout';
    }

    wishlist(): string {
        return '/shop/wishlist';
    }

    blog(): string {
        return '/blog';
    }

    post(): string {
        return `/blog/post-classic`;
    }

    login(): string {
        return '/account/login';
    }

    terms(): string {
        return '/site/terms';
    }

    notFound(): string {
        return `/site/not-found`;
    }
}
