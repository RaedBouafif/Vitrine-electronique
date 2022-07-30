export class Category {
  _id: string;
  categoryName: string;
  image: string;
  active: boolean;
  subCategories: SubCategory[] = [];

  constructor() {}
}

export class SubCategory {
  _id: string;
  name: string;
  active: boolean;
}
