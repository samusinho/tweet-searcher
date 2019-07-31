import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface TwitterResponse {
  data: any;
  resp: any;
}

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  serverUrl: string = 'http://localhost:3000'; //guardar valor en variable de entorno luego

  constructor(private http: HttpClient) {

  }

  getTweets() {
    return this.http.get<TwitterResponse>(`${this.serverUrl}/tweets`).pipe(
      map(data => data)
    );
  }

  searchTweets(word: string) {
    return this.http.get<TwitterResponse>(`${this.serverUrl}/search/${word}`).pipe(
      map(data => data)
    );
  }

  favorite(id: string) {
    return this.http.post<TwitterResponse>(`${this.serverUrl}/favorites/create/${id}`, {
      id: id
    }).pipe(
      map(data => data)
    );
  }

  unfavorite(id: string) {
    return this.http.post<TwitterResponse>(`${this.serverUrl}/favorites/destroy/${id}`, {
      id: id
    }).pipe(
      map(data => data)
    );
  }

  retweet(id: string) {
    return this.http.post<TwitterResponse>(`${this.serverUrl}/retweet/${id}`, {
      id: id
    }).pipe(
      map(data => data)
    );
  }

  destroytweet(id: string) {
    return this.http.post<TwitterResponse>(`${this.serverUrl}/destroy/${id}`, {
      id: id
    }).pipe(
      map(data => data)
    );
  }
}
