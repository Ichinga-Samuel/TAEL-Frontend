import {Component, Input, OnInit} from '@angular/core';
import {BookResult} from "../services/book_result";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
   @Input()public books: BookResult[] | undefined
   @Input()public ready: boolean = false
   @Input()public caption: string|undefined = undefined
  constructor() { }

  ngOnInit(): void {

   }

}
