import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Author} from "../services/author";
import {Store} from "@ngrx/store";
import {selectauthor} from '../state'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  author: Author| null = null
  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectauthor).subscribe(author => {// @ts-ignore
      this.author = author})
    // this.route.data.subscribe(data => {this.author = data.author})
  }
}
