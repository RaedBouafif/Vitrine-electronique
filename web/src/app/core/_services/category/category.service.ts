import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/_models/Category/Category';
import { AdCategory } from 'src/app/core/_models/Category/adCategory';
import { HttpClient } from '@angular/common/http';

const routes = {
  category: () => `/category`,
  categoryWithId: (id: string) => `/category/${id}`,
  adCategory: () => `/adCategory`,
  adCategoryWithId: (id: string) => `/adCategory/${id}`
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  route = 'http://localhost:4002';
  constructor(private _http: HttpClient) {}

  getAllCategorys(): Observable<Category[]> {
    return this._http.get<Category[]>(this.route + routes.category());
  }
  getCategory(id: string): Observable<Category> {
    return this._http.get<Category>(
      this.route + routes.categoryWithId(id)    );
  }
  addCategory(category: Category): Observable<Category> {
    return this._http.post<Category>(
      this.route + routes.category(),
      category
    );
  }
  updateCategory(category: Category): Observable<Category> {
    return this._http.put<Category>(
      this.route + routes.categoryWithId(category._id),
      category
    );
  }
  deleteCategory(id: string): Observable<Category> {
    return this._http.delete<Category>(
      this.route + routes.categoryWithId(id)
    );
  }

  /* Ad Category */
  getAllAdCategories(): Observable<AdCategory[]> {
    return this._http.get<AdCategory[]>(
      this.route + routes.adCategory()
    );
  }
  getAdCategory(id: string): Observable<AdCategory> {
    return this._http.get<AdCategory>(
      this.route + routes.adCategoryWithId(id)
    );
  }
  addAdCategory(category: AdCategory): Observable<AdCategory> {
    return this._http.post<AdCategory>(
      this.route + routes.adCategory(),
      category
    );
  }
  updateAdCategory(category: AdCategory): Observable<AdCategory> {
    return this._http.put<AdCategory>(
      this.route + routes.adCategoryWithId(category._id),
      category
    );
  }
  deleteAdCategory(id: string): Observable<AdCategory> {
    return this._http.delete<AdCategory>(
      this.route + routes.adCategoryWithId(id)    );
  }
}
