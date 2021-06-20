import { Component, OnInit } from '@angular/core';
import {BookSearchService} from "../services/booksearch.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = []
  constructor(private bs: BookSearchService) { }

  ngOnInit(): void {
    this.bs.latest().subscribe(
      value => {
        this.books = value
      },
      error => {console.log(error)}
    )
  }

}
