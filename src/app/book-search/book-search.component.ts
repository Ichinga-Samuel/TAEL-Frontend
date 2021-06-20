import {Component, ElementRef, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {BookSearchService} from "../services/booksearch.service";
import {BookResult} from "../services/book_result";
import {Observable, fromEvent} from "rxjs";
import {debounceTime, filter, map, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  providers: [BookSearchService]
})
export class BookSearchComponent implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  @Output() books: EventEmitter<BookResult[]>  = new EventEmitter();
  constructor(private el: ElementRef, private book: BookSearchService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e:any) => e.target.value), filter((txt: string) => txt.length >= 3), debounceTime(300),
      tap((o:any) => { this.loading.emit(true)
      }), switchMap((query: string) => this.book.search(query))).
      subscribe((books: BookResult[]) =>{
        this.loading.emit(false);
        this.books.emit(books);
    },
      (err:any) => {console.log(err); this.loading.emit(false)},
      () => {this.loading.emit(false)}
    )
  }

}
