import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ExpressInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const nr = req.clone({
      setHeaders: {tael: 'true'}
    })
    return next.handle(nr)
  }

}
