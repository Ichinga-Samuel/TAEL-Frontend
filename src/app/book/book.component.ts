import { Component, OnInit } from '@angular/core';
import {BookSearchService} from "../services/booksearch.service";
import {ActivatedRoute} from "@angular/router";
import {BookResult} from "../services/book_result";
import {map, switchMap} from "rxjs/operators";
import {Store, select} from "@ngrx/store";
import {selectBook} from "../state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Observable<BookResult>|undefined
  similar: BookResult[] = []
  constructor(private bs: BookSearchService, private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    // @ts-ignore
    this.book = this.store.pipe(select(selectBook))
  }

}
