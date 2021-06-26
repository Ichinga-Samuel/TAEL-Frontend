import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {notify, selectUser} from "../state";
import {mergeMap, map} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: string = ''
  loggedin: boolean = false;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.store.select(notify).pipe(mergeMap(n => this.store.select(selectUser).pipe(map(u => {return {user:u, notifs: n}})))).subscribe(
      data =>  {// @ts-ignore
        this.user = data.user.name; this.loggedin=data.notifs.login;}
    )
  }
}
