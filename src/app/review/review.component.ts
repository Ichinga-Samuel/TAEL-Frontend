import {Component, OnInit, HostBinding, Input, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectBook, selectUser, postReview, notify} from "../state";
import {map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  @Input() book: string = ''
  @Input() id: string = ''
  @ViewChild('review') tb: any
  review: string = ''
  name: string = ''
  email: string = ''
  login: boolean = false
  popup = false
  url = ""
  popupMsg = " login before leaving a review"

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) { }

  send(){
    if(this.login){
      let post = {name: this.name, email: this.email, review: this.review, book: this.book, id: this.id}
      this.store.dispatch(postReview({post}))}
    else{
      this.popup = true

      setTimeout(() => {this.popup=false; this.tb.nativeElement.focus()}, 5000, )
    }
  }

  ngOnInit(): void {
    this.url = this.router.url
    console.log(this.url)
      // @ts-ignore
    this.store.select(notify).pipe(mergeMap(n => this.store.select(selectUser).pipe(map(u => {return {user:u, notifs: n}})))).subscribe(
      data =>  {// @ts-ignore
        this.name = data.user.name; this.login=data.notifs.login; this.email = data.user.email}
    )

  }

}
