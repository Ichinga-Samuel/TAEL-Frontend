import { Injectable } from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store, select} from "@ngrx/store";
import {Author} from "./author";
import {AuthorsService} from "./authors.service";
import {author, getAuthor} from "../state";
import {EMPTY, Observable, of} from "rxjs";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})

export class AuthorResolverService implements Resolve<Author>{

  constructor(private aus: AuthorsService, private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Author>{
    const id = route.paramMap.get('id')!
    console.log(id)
    // @ts-ignore
    return this.store.select(author).pipe(take(1), exhaustMap((aut:Author) => {
      if(!aut){this.store.dispatch(getAuthor({id}))} return of(aut)
    }), catchError(() => EMPTY))
  }
}
//return this.store.select(author)
