import { Injectable } from '@angular/core';
import { ApiService } from '@app/core';

import { Observable } from 'rxjs';
import { Message } from '../models/message';

const routes = {
  messages: () => `/messages`
};

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private api: ApiService) {}

  getLatestMessages(): Observable<Message[]> {
    return this.api.query<Message>(routes.messages(), Message);
  }
}
