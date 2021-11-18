import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../services/blogs/blog";
import {Store, select} from "@ngrx/store";
import {likes, selectBlog, selectBook, selectUser} from "../state";
import {combineLatest, map} from "rxjs/operators";
import {faThumbsUp, faComment} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  like = faThumbsUp
  comment = faComment
  caption = "Similar Stories"
  blog: Blog | undefined
  uid: string | undefined
  constructor(private route: ActivatedRoute, private store: Store) { }

  likes(){
    // @ts-ignore
    this.store.dispatch(likes({id: this.blog.id, uid: this.uid}))
  }
  ngOnInit(): void {
    this.store.select(selectBlog).pipe(combineLatest(this.store.select(selectUser))).pipe(map(x => x)).subscribe(data =>
        {
          this.blog = data[0]
          this.uid = data[1].id
        })

  }

}
