import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {notifi, Notify, notify} from "../state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alert = 'alert-info'
  notice = ''
  // stream: Observable<Notify> | any
  constructor(private store: Store) { }


  clear(){
    this.notice = ''
    this.store.dispatch(notifi({Notification: {notice: ''}}))
  }

  ngOnInit(): void {
    // this.stream = this.store.pipe(select(notify))
    this.store.pipe(select(notify)).subscribe(res => {
      this.alert = res.alert || this.alert;
      // console.log(res);
      this.notice = res.notice || '';
    })
  }
}
