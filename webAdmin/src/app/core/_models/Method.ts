export class PaymentMethod {
  _id: string;
  name: string;
  active: boolean;
  deleted: boolean;
  constructor() {
    this.active = true;
    this.deleted = false;
  }
}
export class DeliveryMethod {
  _id: string;
  name: string;
  active: boolean;
  deleted: boolean;
  constructor() {
    this.active = true;
    this.deleted = false;
  }
}
