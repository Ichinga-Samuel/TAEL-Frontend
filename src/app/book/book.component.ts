import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Book} from "../services/book";
import {Store} from "@ngrx/store";
import {selectBook, setBooks, updateDownloads} from "../state";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  book: Book | undefined
  similar: Book[] = []
  caption: string = "Similar Books"

  constructor(private route: ActivatedRoute, private store: Store) {
  }
  down(){
    let id = this.book?.id
    // @ts-ignore
    this.store.dispatch(updateDownloads({id}))
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {this.similar=data.books;})
    this.store.dispatch(setBooks({books:this.similar}))
    this.store.select(selectBook).pipe().subscribe(book => this.book = book)
  }
}
