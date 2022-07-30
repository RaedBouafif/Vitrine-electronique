export class Customer {
  _id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  addresses: Address[];
  function: string;
  registrationDate: Date;
  mail: string;
  login: string;
  password: string;
  active: Boolean;
  mailVerified: Boolean;
  deleted: Boolean;
}
export class Address {
  address: string;
  postalCode: string;
  city: string;
}
