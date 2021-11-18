import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Author} from "../services/authors/author";
import {Store, select} from "@ngrx/store";
import {selectauthors} from "../state";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] | undefined = undefined
  authors$: Observable<Author[]> | undefined
  constructor(private route: ActivatedRoute, private store: Store, private ts: Title) { }

  ngOnInit(): void {
    this.ts.setTitle('Authors Page of The African Ebook Library')
    // .subscribe(val => this.authors =val)
    this.authors$ = this.store.select(selectauthors)
  }
}
