import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Book} from "../services/books/book";
import {Store} from "@ngrx/store";
import {selectBook, setBooks, updateDownloads} from "../state";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  book: Book | undefined
  similar: Book[] = []
  caption: string = "Similar Books"
  title = ''
  constructor(private route: ActivatedRoute, private store: Store, private ts: Title) {
  }
  down(){
    let id = this.book?.id
    // @ts-ignore
    this.store.dispatch(updateDownloads({id}))
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {this.similar=data.books;})

    this.store.select(selectBook).subscribe(book => {this.book = book; this.title = book?.title || ''})
    this.ts.setTitle(this.title)
  }
}
