import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BooksService} from "../../services/books/books.service";
import {addBooks, loadLatest, rateBook, searchBook, getBook, setBook, postReview, updateDownloads, getBooks, setBooks, updateBook} from "./books.actions";
import {catchError, exhaustMap, map} from "rxjs/operators";
import {Store} from "@ngrx/store";


@Injectable()
export class BooksEffects{
  latest$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadLatest), exhaustMap(action => this.bs.latest().pipe(
      map(books => addBooks({books})), catchError(err => [])
    )))
  })

  book$ = createEffect(() => {
    return this.actions$.pipe(ofType(getBook), exhaustMap(id => this.bs.getBook(id.id).pipe(
      map(book => setBook({book})), catchError(err => { throw err  })
    )))
  })

  books$ = createEffect(() => {
    return this.actions$.pipe(ofType(getBooks), exhaustMap(branch => this.bs.getBooks(branch.branch).pipe(
      map(books => setBooks({books})), catchError(err => { throw err})    )))
  })

  reviews$ = createEffect(() => {
    return this.actions$.pipe(ofType(postReview), exhaustMap(post => this.bs.review(post)
      .pipe(map(update => updateBook({update})), catchError(err => {
        throw err
      }))
    ))
  })

  downloads$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateDownloads), exhaustMap(id => this.bs.updateDownloads(id.id).pipe(
      map((update) => updateBook({update})), catchError(err => {
        throw err
      })
    )))
  })

  search$ = createEffect(() => {
    return this.actions$.pipe(ofType(searchBook), exhaustMap(query => this.bs.search(query.query).pipe(
      map(books => setBooks({books})), catchError(err => [])
    )))
  })

  rate$ = createEffect(() => {
    return this.actions$.pipe(ofType(rateBook), exhaustMap(req => this.bs.rate(req.id, req.rating).pipe(
      map((update) => updateBook({update})), catchError(err => {
        throw err
      })
    )))
  })

  constructor(private actions$: Actions, private bs: BooksService, private store: Store) {
  }
}

//let p = {name: post.name, email: post.email, book: post.book, review: post.review, post.post.}
