import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface BotResult {
  text : string;
}

export interface TrackerResult {
  active_form : {};
  events : [];
  slots: [];
}

@Injectable({ providedIn: 'root' })
export class BotConnectionService {
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getReply( message : string ) {
    return this.http.post("http://localhost:5002/webhooks/rest/webhook", '{ "message":  "' + message + '"}', this.httpOptions)
  }

  getTracker() {
    return this.http.get("http://localhost:5002/conversations/default/tracker", this.httpOptions)
  }
}
