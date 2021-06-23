import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  public loaded: boolean = false
  public book: BookResult[] = []
  // @ts-ignore
  public books$ = this.store.pipe(select(books))
  constructor(private router: Router, private store: Store) { }

  submit(query: string): void{
    this.router.navigate(['search'], {queryParams: {query: query}}).then(res => {})
  }

  ngOnInit(): void {
    // if(!this.loaded)
    // @ts-ignore
    this.store.pipe(select(books)).subscribe(val => {let nal =val;
      // @ts-ignore
      if(!nal.length){this.store.dispatch(loadLatest())}
    })
    // this.store.dispatch(loadLatest())
      }

}
