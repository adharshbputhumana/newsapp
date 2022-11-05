import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // getNewsFeed(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.get( 'https://newsapi.org/v2/top-headlines?country=us&apiKey=62d4291cbca34de5821e84da33002081')
  //       .subscribe((response: any) => {
  //         resolve(response.data);
  //       }, reject);
  //   });
  // }

  getNewsFeed(): Observable<any> {
    return this.http
      .get<any>('https://newsapi.org/v2/top-headlines?country=us&apiKey=62d4291cbca34de5821e84da33002081')
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
        })
      );}
}
