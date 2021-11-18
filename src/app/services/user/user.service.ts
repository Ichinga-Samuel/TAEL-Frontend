import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user_object"
import {map} from "rxjs/operators";


interface response{
  user?: User,
  data?: any,
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
  path = 'users/'
  constructor(private http: HttpClient, @Inject('API_URL')private url: string) { }

  createUser(body: any): Observable<response>{
    let url = `${this.url}${this.path}create`
    return this.http.post(url, body).pipe(map((res: any) => ({msg: res.msg, status: res.status})))
  }

  login(body:any): Observable<response>{
    let url = `${this.url}auth/login`
    return this.http.post(url, body).pipe(map((res: any) => {
      let ans: response = {msg: res.msg, status: res.status}
      if(res.user && res.token){ans.user = new User(res.user); ans.token = res.token}
      return ans
  }))
  }

  resetEmail(email: string): Observable<response>{
    let url = `${this.url}${this.path}reset_password`
    return this.http.post(url, {email: email}).pipe(map((res: any) => ({msg: res.msg, status: res.status})))
  }

  reset(body: any): Observable<response>{
    let url = `${this.url}${this.path}change_password`
    return this.http.post(url, body).pipe(map((res: any) => ({msg: res.msg, status: res.status})))
  }

  mark(body:any): Observable<response>{
    let url = `${this.url}${this.path}mark`
    return this.http.post(url, body).pipe(map((res: any) => {
      let data = []
      for(let b of res.fave){data.push({id: b.id, title: b.title, imageUrl: b.imageUrl})}
      return {msg: res.msg, data}
    }))
  }

  emailValidate(value: string):Observable<any> {
    let url = `${this.url}${this.path}validate_email/${value}`
    return this.http.get(url)
  }

}

