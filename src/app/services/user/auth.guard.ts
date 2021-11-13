import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {selectUser, notify} from "../../state";
import {Store, select} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store:Store, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin()
  }

  checkLogin(){
    let login = false
    this.store.pipe(select(notify)).subscribe(val => {
      login = val.login || false;
    })
    if(login){
      return login
    }
    else{
      return this.router.parseUrl('/login?redirectUrl=profile')
    }

  }

}
