import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user_object"
import {map} from "rxjs/operators";


interface response{
  msg: string,
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('API_URL')private url: string) { }

  createUser(body: any): Observable<response>{
    let url = `${this.url}/users/create`
    return this.http.post(url, body).pipe(map((res: any) => ({msg: res.msg, status: res.status})))
  }

  login(body:any): Observable<User>{
    let url = `${this.url}/auth/login`
    return this.http.post(url, body).pipe(map(x => new User(x)))
  }
  emailValidate(value: string):Observable<any> {
    let url = `${this.url}/users/validate_email/${value}`
    return this.http.get(url)
  }

}
