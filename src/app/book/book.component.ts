import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Book} from "../services/books/book";
import {Store, select} from "@ngrx/store";
import {combineLatest, map} from 'rxjs/operators';
import {selectBook, setBooks, updateDownloads, notify, mark, selectUser, rateBook} from "../state";
import {Title} from "@angular/platform-browser";
import {faArrowDown, faStar} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  arrowDown = faArrowDown
  favourite = faStar
  fav = false
  book: Book | undefined
  uid = ''
  rater = false
  similar: Book[] = []
  caption: string = "Similar Books"
  title = ''
  ratings: number[] = []
  constructor(private route: ActivatedRoute, private store: Store, private ts: Title) {
  }
  down(){
    let id = this.book?.id
    // @ts-ignore
    this.store.dispatch(updateDownloads({id}))
  }

  pop(){
    this.rater = !this.rater
  }

  rate(i:number){
    this.rater = !this.rater
    if(this.book?.id)this.store.dispatch(rateBook({id: this.book?.id, rating:i}))
  }

  mark(){
    if(this.uid && this.book?.title){
    this.store.dispatch(mark({title:this.book.title, uid: this.uid}))
    }}

  ngOnInit(): void {
    this.store.select(selectBook).pipe(combineLatest(this.store.select(selectUser))).pipe(map(x => x)).subscribe(data => {
      this.book = data[0]; this.title = this.book?.title || ''; this.ts.setTitle(this.title);
      // @ts-ignore
      this.similar = this.book?.similar || []
      this.ratings = []
      if(this.book){for(let r=0; r<this.book.ratings; r++){this.ratings.push(r)}}
      if(data[1].favourites && data[1].id){
        this.uid = data[1].id
        for(let b of data[1].favourites){
          if(this.book?.title === b.title){this.fav = true; break}
          this.fav = false
      }}
      })
  }
}
