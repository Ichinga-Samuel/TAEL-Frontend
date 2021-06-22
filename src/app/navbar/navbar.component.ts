import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {notify} from "../state";


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
    this.store.pipe(select(notify)).subscribe(val => {this.loggedin = val.login; this.user=val.name
  })
  }
}

