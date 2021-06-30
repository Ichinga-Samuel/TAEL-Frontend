import {Component, ElementRef, OnInit} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, filter, map, switchMap, tap} from "rxjs/operators";
import {Book} from "../services/books/book";
import {addBooks} from "../state";
import {BooksService} from "../services/books/books.service";

@Component({
  selector: 'app-site-search',
  templateUrl: './site-search.component.html',
  styleUrls: ['./site-search.component.css']
})
export class SiteSearchComponent implements OnInit {
  loading: boolean = false
  results: siteSearch
  constructor(private el: ElementRef, private bs: BooksService) { }

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
