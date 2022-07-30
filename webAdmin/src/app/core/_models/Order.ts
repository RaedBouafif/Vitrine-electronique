export class Order {
  _id: string;
  reference: string;
  orderDate: Date;
  customer: string;
  deliveryAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
  status: string;
  paymentStatus: boolean = false;
  total: number;
  totalTTC: number;
  details: OrderDetail[] = [];
}
export class OrderDetail {
  article: string;
  quantity: Number;
  unitPrice: Number;
}
