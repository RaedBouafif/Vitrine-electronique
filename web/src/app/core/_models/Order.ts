export class Order {
  _id: string;
  reference: string;
  orderDate: Date = new Date();
  customer: string;
  deliveryAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
  status: string="new";
  paymentStatus: boolean = false;
  total: Number;
  totalTTC:number;
  details: OrderDetail[] = [];
}
export class OrderDetail {
  article: string;
  quantity: Number;
  unitPrice: Number;
  constructor(article:string,quantity:number,price:number){
    this.article=article;
    this.quantity=quantity;
    this.unitPrice=price;

  }
}
