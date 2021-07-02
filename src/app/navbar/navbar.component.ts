import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Store, select} from "@ngrx/store";
import {logout, notify, selectUser} from "../state";
import {mergeMap, map} from "rxjs/operators";
import {siteSearch} from "../services/books/books.service";
import {Author} from "../services/authors/author";
import {Book} from "../services/books/book";
import {UserService} from "../services/user/user.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user: string = ''
  loggedin: boolean = false;
  @Input() results: siteSearch = {books: [], authors: []}
  @Input() loading: boolean = false
  @Input() checked: boolean = false
  constructor(private store: Store, private us: UserService) {
  }

  checker(){
    this.checked = false
  }
  logout(){this.store.dispatch(logout())}
  ngOnInit(): void {
    // @ts-ignore
    this.store.select(notify).pipe(mergeMap(n => this.store.select(selectUser).pipe(map(u => {return {user:u, notifs: n}})))).subscribe(
      data =>  {// @ts-ignore
        this.user = data.user.name; this.loggedin=data.notifs.login;}
    )
  }
  ngOnDestroy() {
    this.checked = false
  }
}
