import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "./book";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  path: string = '/api/books'
  constructor(private http: HttpClient, @Inject('API_URL') private url: string) {

  }

  search(query: string): Observable<Book[]>{
    const queryUrl: string = `${this.url}${this.path}/search?q=${query}`;
    return this.http.get(queryUrl).pipe(map((res:any) => {return <any>res.map((book:any) =>  new Book(book))}))
}

  latest(): Observable<Book[]>{
    let url = `${this.url}${this.path}/popular`
    return this.http.get(url).pipe(map((res:any) => {return <any>res.map((book:any) => new Book(book))}))
  }

  getBook(id: string): Observable<Book>{
    let url = `${this.url}${this.path}/get/${id}`;
    return this.http.get(url).pipe(map((res: any) => {return  new Book(res)}))
  }

  similar(query: string): Observable<Book[]>{
    const queryUrl: string = `${this.url}${this.path}/similar?q=${query}`;
    return this.http.get(queryUrl).pipe(map((res:any) => {return <any>res.map((book:any) =>  new Book(book))}))
  }

  review(review: any): Observable<any>{
    let path = '/api/reviews'
    let url = `${this.url}${path}`
    delete review.id
    return this.http.post(url, review).pipe()
  }

  updateDownloads(id: string):Observable<any>{
    let url = `${this.url}${this.path}/downloads/${id}`
    return this.http.get(url).pipe(map((res:any) => {return res.id}))
  }
}
