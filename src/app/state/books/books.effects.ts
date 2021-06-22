import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";

import {BookSearchService} from "../../services/booksearch.service";
import {addBooks, loadLatest, searchBook} from "./book.actions";
import {catchError, exhaustMap, map} from "rxjs/operators";
import {of} from "rxjs";
import {Store} from "@ngrx/store";


@Injectable()
export class BooksEffects{
  latest$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadLatest), exhaustMap(action => this.bs.latest().pipe(
      map(books => addBooks({books})), catchError(err => [])
    )))
  })
  search$ = createEffect(() => {
    return this.actions$.pipe(ofType(searchBook), exhaustMap(query => this.bs.search(query.query).pipe(
      map(books => {this.store.dispatch(addBooks({books})); return addBooks({books})}), catchError(err => [])
    )))
  })
  constructor(private actions$: Actions, private bs: BookSearchService, private store: Store) {
  }
}
