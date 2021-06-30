import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Author} from "../services/authors/author";
import {Store, select} from "@ngrx/store";
import {selectauthors} from "../state";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] | undefined = undefined
  constructor(private route: ActivatedRoute, private store: Store, private ts: Title) { }

  ngOnInit(): void {
    this.ts.setTitle('Authors Page of The African Ebook Library')
    this.store.select(selectauthors).subscribe(val => this.authors =val)
  }
}
