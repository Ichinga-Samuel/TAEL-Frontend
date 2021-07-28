import { Component, OnInit } from '@angular/core';
import {Book} from "../services/books/book";
import {novels} from "../state";
import {Store, select} from "@ngrx/store";

@Component({
  selector: 'app-novels',
  templateUrl: './novels.component.html',
  styleUrls: ['./novels.component.css']
})
export class NovelsComponent implements OnInit {
  caption = 'Most Popular African Novels'
  novels: Book[] = []
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(novels)).subscribe(data => {
      this.novels = data
    })
  }

}
