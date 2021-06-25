import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store, select} from "@ngrx/store";
import {loadLatest} from "../state/books/book.actions";
import {books} from "../state/"
import {BookResult} from "../services/book_result";
import {exhaustMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked, AfterViewInit {
  public ready: boolean = true
  public books: BookResult[] = []
  public caption: string = "Most Popular Books"
  constructor(private router: Router, private store: Store) { }

  submit(query: string): void{
    this.router.navigate(['search'], {queryParams: {query: query}}).then(res => {})
  }
  ngAfterViewChecked(): void{

  if(this.books.length){this.ready=true }

  }
  ngAfterViewInit(): void{

  if(this.books.length){this.ready=true }

  }
  ngOnInit(): void {
    // @ts-ignore
    this.store.pipe(select(books)).subscribe(val => {this.books = val;
      // @ts-ignore
      if(!this.books.length){this.store.dispatch(loadLatest())}
    })
    // this.store.dispatch(loadLatest())
      }

}
