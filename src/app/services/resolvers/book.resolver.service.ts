import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from "@ngrx/store";
import {BooksService} from "../books.service";
import {getBook, selectBook} from '../../state';
import {EMPTY, Observable} from "rxjs";
import {catchError, exhaustMap, take} from "rxjs/operators";
import {Book} from "../book";
@Injectable({
  providedIn: 'root'
})

export class BookResolverService implements Resolve<Book>{
  constructor(private bs: BooksService, private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book>{
    const id = route.paramMap.get('id')!
    // @ts-ignore
    return this.store.select(selectBook).pipe(take(1), exhaustMap((book:Book) => {
      if(!book){this.store.dispatch(getBook({id}))} return this.bs.similar('Politics')

    }), catchError(() => EMPTY))
  }
}

