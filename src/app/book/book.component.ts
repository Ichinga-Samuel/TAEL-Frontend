import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Book} from "../services/books/book";
import {Store} from "@ngrx/store";
import {selectBook, setBooks, updateDownloads, notify, mark, selectUser, rateBook} from "../state";
import {Title} from "@angular/platform-browser";
import {faArrowDown, faStar} from "@fortawesome/free-solid-svg-icons";
import {User} from "../services/user/user_object";


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
  user: User | undefined
  rater = false
  similar: Book[] = []
  caption: string = "Similar Books"
  title = ''
  ratings: number[] = []
  login = false
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
     let id = this.book?.id
     // @ts-ignore
    this.store.dispatch(rateBook({id:id, rating:i}))
  }

  mark(){
    // @ts-ignore
    let title = this.book.title
    // @ts-ignore
    if(this.user.id){
      // @ts-ignore
      let uid = this.user.id
    this.store.dispatch(mark({title, uid}))
    this.store.select(selectUser).subscribe(data => {
        this.user = data.id !== '' ? data: undefined;
        // @ts-ignore
        for(let b of this.user?.favourites){
          if(title === b.title){this.fav = true; break}
          this.fav = false
        }
    })
    }


  }
  ngOnInit(): void {
    this.store.select(notify).subscribe(val => this.login = val.login)
    this.store.select(selectBook).subscribe(book => {this.book = book; this.title = book?.title || ''; this.ts.setTitle(this.title);
      // @ts-ignore
      this.similar = book?.similar !== undefined ? book.similar : []
    })

    if(this.book){
      this.ratings = []
    for(let r=0; r<this.book.ratings; r++){
       this.ratings.push(r)
     }
    }


    this.ts.setTitle(this.title)
    if(this.login){
      this.store.select(selectUser).subscribe(data => {
        this.user = data.id !== '' ? data: undefined;
        // @ts-ignore
        for(let b of this.user?.favourites){
          if(this.book?.title === b.title){this.fav = true; break}
        }
    })
    }
  }
}
