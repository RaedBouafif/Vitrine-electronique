import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { Message, Mail } from 'src/app/core/_models/messaging';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const routes = {
  //connectMessage: (login: string, password: string) =>`/connect/${login}/${password}`,
  getNewMessages: () => `/newMessaging`,
  getMessages: () => `/messaging`,
  getNewMessagesCount: () => `/countMessage`,
  message: (id: string) => `/messaging/${id}`,
  addMessage: () => `/messaging`,
  readMessage: (id: string) => `/readMessage/${id}`,
  sendMessage: () => `/sendMail`
};
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  route = 'http://localhost:4004';
  constructor(private _http: HttpClient) {}

  getNewMessages(): Observable<Message[]> {
    return this._http.get<Message[]>(
      this.route + routes.getNewMessages()
    );
  }
  getMessages(): Observable<Message[]> {
    return this._http.get<Message[]>(this.route + routes.getMessages());
  }
  getNewMessagesCount(): Observable<any> {
    return this._http.get<any[]>(
      this.route + routes.getNewMessagesCount()
    );
  }
  sendMessage(message: Message): Observable<Message> {
    return this._http.post<Message>(
      this.route + routes.addMessage(),
      message    );
  }
  updateMessage(id: string, message: Message): Observable<Message> {
    return this._http.put<Message>(
      this.route + routes.message(id),
      message
    );
  }
  readMessage(id: string): Observable<Message> {
    return this._http.put<Message>(
      this.route + routes.readMessage(id),
      null    );
  }
  deleteMessage(id: string): Observable<String> {
    return this._http.delete<String>(this.route + routes.message(id));
  }
  SendMail(mail: Mail): Observable<Boolean> {
    return this._http.post<Boolean>(
      this.route + routes.sendMessage(),
      mail
    );
  }
}
