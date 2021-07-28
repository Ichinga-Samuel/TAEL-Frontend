import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from "@ngrx/store";
import {BooksService} from "./books.service";
import {books, getBook, selectBook, setBooks} from '../../state';
import {EMPTY, Observable, of} from "rxjs";
import {catchError, exhaustMap, map, mergeMap, take, tap, concatMap} from "rxjs/operators";
import {Book} from "./book";
@Injectable({
  providedIn: 'root'
})

export class BookResolverService implements Resolve<Book>{
  constructor(private bs: BooksService, private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> | Observable<never>{
    const id = route.paramMap.get('id')!
    // @ts-ignore
    return this.store.select(selectBook).pipe(take(1), exhaustMap((book:Book) => {
      if(!book){this.store.dispatch(getBook({id}))} return of(book)
    //  # Todo: Fix Book Recommendations
    }), catchError(() => of([])))


  }
}

// return this.store.select(selectBook).pipe(take(1), exhaustMap((book:Book) => {
    //   if(!book){this.store.dispatch(getBook({id}))} return this.bs.similar(id).pipe(map((books: Book[]) => {this.store.dispatch(setBooks({books})); return books}))
    // //  # Todo: Fix Book Recommendations
    // }), catchError(() => of([])))
