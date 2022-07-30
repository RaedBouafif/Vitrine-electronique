import { Injectable } from '@angular/core';
import { ApiService } from '@app/core';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';

const PerPage: number = 10;

const routes = {
  all: () => `/users/all`,
  paged: (count: number) => `/users/all/${count}`
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private api: ApiService) {}

  /**
   * Get 10 users from the server
   */
  getUsers(): Observable<User[]> {
    return this.api.query<User>(routes.all(), User);
  }

  /**
   * This is just a fake pagination sample, our API actually doesn't get the users paged
   * It just fetch N users from the server
   * @param page The page to fetch from the server
   */
  getPaged(page: number): Observable<User[]> {
    return this.api.query<User>(routes.paged(page * PerPage), User);
  }

  /**
   * This method retrieves @count users from the server
   * @param count The count of users to retrieve
   */
  getByCount(count: number): Observable<User[]> {
    return this.api.query<User>(routes.paged(count), User);
  }
}
