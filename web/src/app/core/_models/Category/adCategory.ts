export class AdCategory {
  _id: string;
  title: string;
  active: boolean;
  deleted: boolean;
  creationDate: Date;
  subCategories: AdSubCategory[] = [];

  constructor() {}
}

export class AdSubCategory {
  _id: string;
  title: string;
  active: boolean;
  deleted: boolean;
  creationDate: Date;
  families: Family[] = [];
  constructor(title: string) {
    this.title = title;
    this.active = false;
    this.deleted = false;
    this.creationDate = new Date();
  }
}
export class Family {
  _id: string;
  title: string;
  active: boolean;
  deleted: boolean;
  creationDate: Date;
  constructor(title: string) {
    this.title = title;
    this.active = false;
    this.deleted = false;
    this.creationDate = new Date();
  }
}
