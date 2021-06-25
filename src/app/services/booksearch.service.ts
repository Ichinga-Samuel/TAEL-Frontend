import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookResult} from "./book_result";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService {
  path: string = '/api/books'
  constructor(private http: HttpClient, @Inject('API_URL') private url: string) {

  }

  search(query: string): Observable<BookResult[]>{
    const queryUrl: string = `${this.url}${this.path}/search?q=${query}`;
    return this.http.get(queryUrl).pipe(map((res:any) => {return <any>res.map((book:any) =>  new BookResult(book))}))
}

  latest(): Observable<BookResult[]>{
    let url = `${this.url}${this.path}/popular`
    return this.http.get(url).pipe(map((res:any) => {return <any>res.map((book:any) => new BookResult(book))}))
  }

  getBook(id: string): Observable<BookResult>{
    let url = `${this.url}${this.path}/get/${id}`;
    return this.http.get(url).pipe(map((res: any) => {return  new BookResult(res)}))
  }

  similar(query: string): Observable<BookResult[]>{
  const queryUrl: string = `${this.url}${this.path}/similar?q=${query}`;
  return this.http.get(queryUrl).pipe(map((res:any) => {return <any>res.map((book:any) =>  new BookResult(book))}))
}

}
