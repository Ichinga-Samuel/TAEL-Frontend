import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user_object"
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('API_URL')private url: string) { }

  createUser(body: any): Observable<any>{
    let url = `${this.url}/users/create`
    return this.http.post(url, body)
  }

  login(body:any): Observable<User>{
    let url = `${this.url}/auth/login`
    return this.http.post(url, body).pipe(map(x => new User(x)))
  }
}
