import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../services/book";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
   @Input()public books: Book[] | undefined
   @Input()public caption: string|undefined = undefined
  constructor() { }

  ngOnInit(): void {

   }

}
