import { Injectable, Inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "./blog";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  path = 'blogs/'
  constructor(@Inject('API_URL') private url: string, private http: HttpClient) { }

  latest(): Observable<Blog[]>{
    let path = `${this.url}${this.path}latest`
    return this.http.get(path).pipe(map((res: any) => {return res.data.map((obj: any) => {return new Blog(obj)})}))
  }
 search(query: string): Observable<Array<Blog>>{
  let path = `${this.url}${this.path}search?${query}`
  return this.http.get(path).pipe(map((res: any) => {return <any>res.data.map((obj:any) => new Blog(obj))}))
}
  like(id: string, uid?: string): Observable<any>{
    let path = `$${this.url}${this.path}likes?id=${id}&uid=${uid}`
    return this.http.get(path).pipe(map((res: any) => ({id, changes: {likes: res.data}})))
}
  getBlog(id: string): Observable<Blog>{
    let path = `${this.url}${this.path}get/${id}`
    return this.http.get(path).pipe(map((res: any) => new Blog(res.data)))
  }

  create(body: any): Observable<any>{
    let path = `${this.url}${this.path}create`
    return this.http.post(path, body).pipe(map((res: any) => res))
  }
}

