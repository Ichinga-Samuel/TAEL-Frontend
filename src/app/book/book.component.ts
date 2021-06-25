import { Component, OnInit, AfterViewChecked, AfterViewInit,} from '@angular/core';
import {BookSearchService} from "../services/booksearch.service";
import {ActivatedRoute} from "@angular/router";
import {BookResult} from "../services/book_result";
import {exhaustMap, filter, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {Store, select} from "@ngrx/store";
import {selectBook} from "../state";
import {getBook, addBooks, setBooks, setBook} from "../state/books/book.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit, AfterViewChecked{
  book: BookResult | undefined
  similar: BookResult[] = []
  ready: boolean = false
  caption: string = "Similar Books"

  constructor(private bs: BookSearchService, private route: ActivatedRoute, private store: Store) {
  }
  ngAfterViewInit(): void{

  if(this.similar.length){this.ready=true }

  }
  ngAfterViewChecked(): void{

  if(this.similar.length){this.ready=true }

  }
  load(q: string[]): string{
    let g = q.join('+')
    return g
  }

  ngOnInit(): void {
    // @ts-ignore
    this.store.select(selectBook).pipe(filter(q => q!==undefined), tap(book => this.book=book),
      exhaustMap((q:BookResult) => {let v = this.load(q.genres); return this.bs.similar(v)})).subscribe(books => {this.similar = books; this.store.dispatch(setBooks({books}))})
    // @ts-ignore
    this.store.select(selectBook).pipe(filter(q => q===undefined), exhaustMap(x => this.route.paramMap.pipe(map(params => params.get('id')),
        exhaustMap((query:string) => {this.store.dispatch(getBook({query})); return this.store.select(selectBook).pipe(tap(x => this.book=x))})))).subscribe((book) => {})
  }
}
