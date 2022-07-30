import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/core/_models/Image';
import { HttpClient } from '@angular/common/http';

const routes = {
  image: () => `/image`,
  imageWithId: (id: string) => `/image/${id}`,
  upload: () => `/upload`
};
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  route = 'http://localhost:4005';
  constructor(private _http: HttpClient) {}

  getAllImages(): Observable<Image[]> {
    return this._http.get<Image[]>('http://localhost:4005/image');
  }
  getImage(id: string): Observable<Image> {
    return this._http.get<Image>('http://localhost:4005/image/61a5f862ddf24709d4c1f8c6');
  }
  addImage(image: Image): Observable<Image> {
    return this._http.post<Image>(this.route + routes.image(), image);
  }
  updateImage(image: Image): Observable<Image> {
    return this._http.put<Image>(
      this.route + routes.imageWithId(image._id),
      image
    );
  }
  deleteImage(id: string): Observable<Image> {
    return this._http.delete<Image>(this.route + routes.imageWithId(id));
  }
 /*  uploadImage(image: any): Observable<any> {
    const formdata: FormData = new FormData();

    formdata.append('file', image);
    return this._http.postImage<any>(this.route + routes.upload(), formdata);
  } */
 uploadImage(file: any): Observable<any> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    return this._http.post('http://localhost:4005/upload', formdata, { responseType: 'text' as 'json' });

  }
  
}
