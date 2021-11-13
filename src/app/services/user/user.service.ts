import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user_object"
import {map} from "rxjs/operators";


interface response{
  user?: User,
  msg?: string,
  status?: boolean,
  token?: string
}

interface data{
  token: string,
  user: User
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

  login(body:any): Observable<response>{
    let url = `${this.url}/auth/login`
    return this.http.post(url, body).pipe(map((res: any) => {
      let ans: response = {msg: res.msg, status: res.status}
      if(res.user && res.token){ans.user = new User(res.user); ans.token = res.token}
      return ans
  }))
  }

  resetEmail(email: string): Observable<response>{
    let url = `${this.url}/users/reset_password`
    return this.http.post(url, {email: email}).pipe(map((res: any) => ({msg: res.msg, status: res.status})))
  }

  reset(body: any): Observable<response>{
    let url = `${this.url}/users/change_password`
    return this.http.post(url, body).pipe(map((res: any) => ({msg: res.msg, status: res.status})))
  }

  mark(body:any): Observable<response>{
    let url = `${this.url}/users/mark`
    return this.http.post(url, body).pipe(map((res: any) => ({msg: res.msg, user: new User(res.user)})))
  }

  emailValidate(value: string):Observable<any> {
    let url = `${this.url}/users/validate_email/${value}`
    return this.http.get(url)
  }

}
