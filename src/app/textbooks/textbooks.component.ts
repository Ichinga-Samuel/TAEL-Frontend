import { Component, OnInit } from '@angular/core';
import {textbooks} from "../state";
import {Store} from "@ngrx/store";
import {Book} from "../services/books/book";

@Component({
  selector: 'app-textbooks',
  templateUrl: './textbooks.component.html',
  styleUrls: ['./textbooks.component.css']
})
export class TextbooksComponent implements OnInit {
  caption = "Text Books"
  books: Book[] = []
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(textbooks).pipe().subscribe(data => {this.books = data})
  }
}
