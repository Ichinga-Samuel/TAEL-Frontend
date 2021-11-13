import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../services/books/book";
import {BooksService} from "../services/books/books.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {Store, select} from "@ngrx/store";
import {setBooks} from "../state";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() result: Book[] | undefined;
  @Input() loading: boolean = false
  constructor(private store: Store, private route: ActivatedRoute, private bs: BooksService) {
  }
  getResults(books: Book[]): void{
    this.result = books
  }
  ngOnInit(): void {
    this.route.queryParamMap.pipe(map(param => param.get('query') || ''), filter(q => q.length>=3), switchMap(query => this.bs.search(query)))
      .subscribe(books => {
        this.result = books;
        this.store.dispatch(setBooks({books}))
      })
  }
}
