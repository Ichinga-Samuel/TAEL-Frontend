import {Component, ElementRef, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {Book} from "../services/books/book";
import {Observable, fromEvent} from "rxjs";
import {debounceTime, filter, map, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {addBooks} from "../state";
import {BooksService} from "../services/books/books.service";


@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  @Output() books: EventEmitter<Book[]>  = new EventEmitter();
  constructor(private el: ElementRef, private store: Store, private router: Router, private route: ActivatedRoute, private bs: BooksService) {
  }

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e:any) => e.target.value), filter((txt: string) => txt.length >= 3), debounceTime(300),
      tap((o:any) => { this.loading.emit(true)
      }), switchMap((query: string) => this.bs.search(query))).
      subscribe((books: Book[]) =>{
        this.loading.emit(false);
        this.books.emit(books);
        this.store.dispatch(addBooks({books}))
    },
      (err:any) => {console.log(err); this.loading.emit(false); this.books.emit([])},
      () => {this.loading.emit(false)}
    )
  }
}
