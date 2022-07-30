export class Ad {
  _id: string;
  title: string;
  description: string;
  price: number;
  creationDate: Date;
  status: string;
  family: string;
  subCategory: string;
  category: string;
  customer: AdCustomer;
}

export class AdCustomer {
  id: string;
  name: string;
  mail: string;
  phoneNumber: string;
}
