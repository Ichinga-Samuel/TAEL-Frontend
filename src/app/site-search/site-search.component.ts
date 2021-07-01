import {Component, ElementRef, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, filter, map, switchMap, tap} from "rxjs/operators";
import {Book} from "../services/books/book";
import {addBooks} from "../state";
import {BooksService, siteSearch} from "../services/books/books.service";

@Component({
  selector: 'app-site-search',
  templateUrl: './site-search.component.html',
  styleUrls: ['./site-search.component.css']
})
export class SiteSearchComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() check: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() results: EventEmitter<siteSearch> = new EventEmitter<siteSearch>()
  // @ViewChild('modaltrigger') mt: ElementRef | undefined
  // @ViewChild('res') res: ElementRef | undefined
  // checked = false
  constructor(private el: ElementRef, private bs: BooksService) { }

  checker(){
    this.check.emit(false)
  }
  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e:any) => e.target.value), filter((txt: string) => txt.length >= 2), debounceTime(300),
      tap((o:any) => { this.loading.emit(true); this.check.emit(true); }),
      switchMap((query: string) => this.bs.site_search(query))).
      subscribe((result: siteSearch) =>{
        this.loading.emit(false)
        this.results.emit(result)
    },
      (err:any) => {this.loading.emit(false) },
      () => {this.loading.emit(false) }
    )
  }

}
