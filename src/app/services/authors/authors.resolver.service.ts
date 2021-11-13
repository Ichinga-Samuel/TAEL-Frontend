import { Injectable } from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store, select} from "@ngrx/store";
import {Author} from "./author";
import {AuthorsService} from "./authors.service";
import {selectauthors, loadAll} from "../../state";
import {Observable, of, EMPTY} from "rxjs";
import {exhaustMap, take, catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthorsResolverService implements Resolve<Author[]>{

  constructor(private aus: AuthorsService, private store: Store,  private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Author[]>{
    return this.store.select(selectauthors).pipe(take(1), exhaustMap((author:Author[]) => {
      if(author.length < 10){this.store.dispatch(loadAll());}
      return of(author)
    }), catchError(() => EMPTY))
  }
}


