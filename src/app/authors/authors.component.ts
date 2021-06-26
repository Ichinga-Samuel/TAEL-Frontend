import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Author} from "../services/author";
import {Store, select} from "@ngrx/store";
import {authors} from "../state";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = []
  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.store.select(authors).subscribe(val => this.authors =val)
  }

}
