import { Component, OnInit } from '@angular/core';
import {BookSearchService} from "../services/booksearch.service";
import {ActivatedRoute} from "@angular/router";
import {BookResult} from "../services/book_result";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: BookResult | undefined
  similar: BookResult[] = []
  constructor(private bs: BookSearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map(params => params.get('id') || ''), switchMap(id => this.bs.getBook(id))).subscribe(
      (value => {this.book = value.book; this.similar = value.similar})
    )
  }

}
