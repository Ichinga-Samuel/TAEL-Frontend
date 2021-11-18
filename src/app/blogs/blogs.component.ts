import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {blogs} from "../state";
import {Blog} from "../services/blogs/blog";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  caption = "Latest Stories"
  blog: Blog[] = []
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(blogs).subscribe(blogs => {
      this.blog = blogs
    })
  }

}
