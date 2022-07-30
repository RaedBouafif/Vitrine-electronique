export class Article {
  _id: string;
  title: string;
  description: string = '';
  reference: string;
  availability: string;
  price: number;
  tax:number;
  quantity: number;
  creationDate: Date;
  active: Boolean;
  deleted: Boolean;
  discount: Discount = new Discount();
  images: Media[] = [];
  videos: Media[] = [];
  features: Feature[] = [];
  categories: CategoryTable[] = [];
  priceHistory: PriceHistory[] = [];
}
export class Discount {
  onDiscount: Boolean = false;
  percentage: number = 0;
}
export class Media {
  _id:string;
  path: string;
  constructor(path: string) {
    this.path = path;
  }
}
export class Feature {
  _id: string;
  name: string = '';
  value: String = '';
}
export class CategoryTable {
  category: string;
  subCategory: String;
}
export class PriceHistory {
  price: Number;
  updateDate: Date;
  constructor(price: Number) {
    this.price = price;
    this.updateDate = new Date();
  }
}
