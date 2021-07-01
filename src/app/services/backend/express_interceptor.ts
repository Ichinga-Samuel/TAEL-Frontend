import { Injectable } from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {selectUser} from "../../state";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExpressInterceptor implements HttpInterceptor{

  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('intercepting')
     let headers = new HttpHeaders({
        'tael': 'true',
         'Access-Control-Allow-Origin': 'http://localhost:4200'
     })
    let user :any
    this.store.select(selectUser).pipe().subscribe(user_ => {user = user_; console.log(user_)})
    const nr = req.clone({
      withCredentials: true,
      headers: req.headers.set('Access-Control-Allow-Origin', 'http://localhost:4200')
    })

    console.log(req.headers)
    return next.handle(nr)
  }

}
