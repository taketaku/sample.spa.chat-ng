import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Message } from '../shared/models/message';

import { BaseURL } from '../constants/baseurl';

@Injectable()
export class MessageService {
  private API = BaseURL;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  private subject = new Subject();

  get watting() {
    return this.subject.asObservable();
  }

  constructor(private http: HttpClient) { }

  fetch(cname: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.API}/channels/${cname}/messages`);
  }

  post (cname: string, body: string): Observable<Message> {
    return this.http.post<Message>(`${this.API}/channels/${cname}/messages`, {'body': body}, this.httpOptions);
  }

  notify() {
    this.subject.next();
  }
}
