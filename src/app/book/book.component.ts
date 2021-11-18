import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Book} from "../services/books/book";
import {Store, select} from "@ngrx/store";
import {combineLatest, map} from 'rxjs/operators';
import {selectBook, setBooks, updateDownloads, notify, mark, selectUser, rateBook} from "../state";
import {Title} from "@angular/platform-browser";
import {faArrowDown, faStar} from "@fortawesome/free-solid-svg-icons";
import {UserState} from "../state/user/user.reducer";


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
  user: UserState | undefined
  caption: string = "Similar Books"
  stars: number[] = []
  nstars: number[] = []

  constructor(private route: ActivatedRoute, private store: Store, private ts: Title) {
  }
  down(){
    if(this.book?.id)this.store.dispatch(updateDownloads({id: this.book?.id}))
  }

  rate(i:number){
    if(this.book?.id)this.store.dispatch(rateBook({id: this.book?.id, rating:i}))
  }

  mark(){
    if(this.user?.id && this.book?.title){
      let action = this.fav ? 'pull': 'add'
      this.store.dispatch(mark({title:this.book.title, uid: this.user.id, action: action}))}
    }

  ngOnInit(): void {
    this.store.select(selectBook).pipe(combineLatest(this.store.select(selectUser))).pipe(map(x => x)).subscribe(data => {
      [this.book, this.user] = data
      this.ts.setTitle(this.book?.title || "");
      if (this.book){
        let s = [1, 2, 3, 4, 5]
        let r = 5 - this.book.ratings
        this.stars =  s.slice(0, this.book.ratings)
        this.nstars = s.slice(-r)
        for (let b of this.user.favourites) { if (this.book.title === b.title){this.fav = true; break} this.fav = false}
      }
    })
  }
}
