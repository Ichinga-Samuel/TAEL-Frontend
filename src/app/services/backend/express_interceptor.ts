import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {notify} from "../../state";
import {select, Store} from "@ngrx/store";
import {pipe} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ExpressInterceptor implements HttpInterceptor{

  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    let token = "";
    this.store.pipe(select(notify)).subscribe(state => token = state.token)
    console.log(token)
    if(token){
       console.log(token)
       const nr = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
      return next.handle(nr)
    }
    else{
      return next.handle(req)
    }


  }

}
