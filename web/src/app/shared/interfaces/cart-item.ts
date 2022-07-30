import { Product } from './product';
import { Article } from 'src/app/core/_models/Article';

export interface CartItem {
    product: Article;
    options: {
        name: string;
        value: string;
    }[];
    quantity: number;
    price:number;
    priceTTC:number
}
