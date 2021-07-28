import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Book} from "./book";
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {textbooks, getBooks} from "../../state";
import {catchError, exhaustMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TextbooksResolverService  implements Resolve<Book[]> {

  constructor(private store: Store){ }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> | Promise<Book[]> | Book[] {
    return this.store.select(textbooks).pipe(take(1), exhaustMap((books: Book[]) => {
      if(books.length < 5){this.store.dispatch(getBooks({branch: 'Textbook'}))} return of(books)
    }))
  }
}
