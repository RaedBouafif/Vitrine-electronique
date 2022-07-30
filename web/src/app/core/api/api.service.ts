import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Logger } from '../logger.service';
const logger = new Logger('ApiService');

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}



  public get<T>(route: string, itemType: any): Observable<T> {
    if (!route) {
      return;
    }

    return this.http.get<T>(route).pipe(
      map((data: T) => {
        return data;
        // return new ModelMapper<T>(itemType).map(data);
      })
    );
  }
  public post<T>(route: string, object: any, itemType: any): Observable<T> {
    if (!route) {
      return;
    }

    return this.http
      .cache()
      .post<T>(route, object)
      .pipe(
        map((data: T) => {
          return data;
          // return new ModelMapper<T>(itemType).map(data);
        })
      );
  }
  public postImage<T>(route: string, object: any): Observable<T> {
    if (!route) {
      return;
    }

    return this.http
      .cache()
      .post<T>(route, object, { responseType: 'text' as 'json' })
      .pipe(
        map((data: T) => {
          return data;
          // return new ModelMapper<T>(itemType).map(data);
        })
      );
  }
  public put<T>(route: string, object: any, itemType: any): Observable<T> {
    if (!route) {
      return;
    }

    return this.http
      .cache()
      .put<T>(route, object)
      .pipe(
        map((data: T) => {
          return data;
          // return new ModelMapper<T>(itemType).map(data);
        })
      );
  }
  public delete<T>(route: string, itemType: any): Observable<T> {
    if (!route) {
      return;
    }

    return this.http
      .cache()
      .delete<T>(route)
      .pipe(
        map((data: T) => {
          return data;
          // return new ModelMapper<T>(itemType).map(data);
        })
      );
  }
}
