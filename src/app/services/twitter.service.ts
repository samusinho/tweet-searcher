import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  serverUrl: string = 'http://localhost:3000'; //guardar valor en variable de entorno luego

  constructor(private http: HttpClient, private _alert: AlertService) {

  }

  getTweets() {
    return this.http.get<any>(`${this.serverUrl}/tweets`).pipe(
      map(data => data),
      catchError(err => {
        this._alert.showError(err);
        return [];
      })
    );
  }

  searchTweets(word: string) {
    return this.http.get<any>(`${this.serverUrl}/search/${word}`).pipe(
      map(data => data),
      catchError(err => {
        this._alert.showError(err);
        return [];
      })
    );
  }

  favorite(id: string) {
    return this.http.post<any>(`${this.serverUrl}/favorites/create/${id}`, {
      id: id
    }).pipe(
      map(data => data),
      catchError(err => {
        this._alert.showError(err);
        return [];
      })
    );
  }

  unfavorite(id: string) {
    return this.http.post<any>(`${this.serverUrl}/favorites/destroy/${id}`, {
      id: id
    }).pipe(
      map(data => data),
      catchError(err => {
        this._alert.showError(err);
        return [];
      })
    );
  }

  retweet(id: string) {
    return this.http.post<any>(`${this.serverUrl}/retweet/${id}`, {
      id: id
    }).pipe(
      map(data => data),
      catchError(err => {
        this._alert.showError(err);
        return [];
      })
    );
  }

  unretweet(id: string) {
    return this.http.post<any>(`${this.serverUrl}/unretweet/${id}`, {
      id: id
    }).pipe(
      map(data => data),
      catchError(err => {
        this._alert.showError(err);
        return [];
      })
    );
  }
}