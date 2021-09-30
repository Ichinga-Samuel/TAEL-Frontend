import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Author} from "../services/authors/author";
import {Store} from "@ngrx/store";
import {selectauthor} from '../state'
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  author: Author| null = null
  title = ''
  constructor(private route: ActivatedRoute, private store: Store, private ts: Title) { }

  ngOnInit(): void {
    this.store.select(selectauthor).subscribe(author => {
      // @ts-ignore
      this.author = author; this.title = author?.name})
    this.ts.setTitle(this.title)
    // this.route.data.subscribe(data => {this.author = data.author})
  }
}
