import {Component, Input, OnInit} from '@angular/core';
import {BookResult} from "../services/book_result";
import {BookSearchService} from "../services/booksearch.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {Store, select} from "@ngrx/store";

import {searchBook, addBooks} from "../state/books/book.actions";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() result: BookResult[] | undefined;
  @Input() loading: boolean = false
  constructor(private store: Store, private route: ActivatedRoute, private bs: BookSearchService) {
  }
  getResults(books: BookResult[]): void{
    this.result = books
  }
  ngOnInit(): void {
    this.route.queryParamMap.pipe(map(param => param.get('query') || ''), filter(q => q.length>=3), switchMap(query => this.bs.search(query)))
      .subscribe(books => {
        this.result = books;
        this.store.dispatch(addBooks({books}))
      })
  }
}
