import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../books/book";
import {map} from "rxjs/operators";
import {Author} from "./author";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  path: string = '/api/authors'
  constructor(private http: HttpClient, @Inject('API_URL') private url: string) {}

  getAll():Observable<Author[]>{
    const queryUrl: string = `${this.url}${this.path}/all`;
    return this.http.get(queryUrl).pipe(map((res:any) => {return <any>res.map((author:any) =>  new Author(author))}))
  }

  search(query: string): Observable<Author[]>{
  const queryUrl: string = `${this.url}${this.path}/search?q=${query}`;
  return this.http.get(queryUrl).pipe(map((res:any) => {return <any>res.map((author:any) =>  new Author(author))}))
}

  getAuthor(id: string): Observable<Author>{
  let url = `${this.url}${this.path}/get/${id}`;
  return this.http.get(url).pipe(map((res: any) => {return  new Author(res)}))
}
}
