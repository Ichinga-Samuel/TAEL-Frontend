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
    this.store.pipe(select(notify)).subscribe(state => token = state.token || '')

    const nr = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`, From: `${window.location.protocol}//${window.location.host}`}
    })
      return next.handle(nr)
    }
}
