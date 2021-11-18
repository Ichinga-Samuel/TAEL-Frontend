import { Component, OnInit, Input } from '@angular/core';
// import {Blog} from "../services/blogs/blog";

interface Blog {
    id: string,
    author: string,
    imageUrl: string,
    title: string
    duration: number,
    date: Date
}
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  @Input() blogs: Blog[] = []
  @Input() caption: string = "Latest Blog"
  constructor() { }
  ngOnInit(): void {
  }
}
