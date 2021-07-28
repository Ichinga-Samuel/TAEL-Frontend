import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, mergeMap} from "rxjs/operators";
import {login, setUser, signup, logout, resetUser, mark} from "./user.actions";
import {setBooks} from "../books/books.actions";
import {Store} from "@ngrx/store";
import {Notifications, notify} from "../notify/notify.actions";
import {UserService} from "../../services/user/user.service";
import {of} from "rxjs";
import {not} from "rxjs/internal-compatibility";

@Injectable()
export class UserEffects{

  user$ = createEffect(() => {
    return this.actions$.pipe(ofType(login), exhaustMap(action => this.us.login({email:action.email, password: action.password}).pipe(
      map((res) => {this.store.dispatch(setUser({user:res.user})); return res}), map((res) => {let Notification = {msg: `Logged in as ${res.user.name}`, status: "Logged in", login: true, token: res.token}; return notify({Notification})}),
      catchError(err => {let Notification = {msg: 'Unable to Login', status: "logged out", login: false}; return of(notify({Notification}))}),

    ))
    )
  })
  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(logout), exhaustMap(x => {this.store.dispatch(resetUser()); let Notification = {msg: '', status: "logged out", login: false};
    return of(notify({Notification}))
    }))

  })
  sign$ = createEffect(() => this.actions$.pipe(ofType(signup), exhaustMap(action => this.us.createUser(action.user).pipe(
    map(res => {let Notification = {msg: `User Account Created`, status: "created", login: false}; return notify({Notification})}),
    catchError(err => {let Notification = {msg: 'Unable to Create User Account', status: "not created", login: false}; return of(notify({Notification})) })
    )
  )))

  mark$ = createEffect(() => {
      return this.actions$.pipe(ofType(mark), exhaustMap(action => this.us.mark({uid:action.uid, title:action.title}).pipe(
        map(res => {// @ts-ignore
          this.store.dispatch(setUser({user: res.user})); return notify({Notification:{msg:res.msg}})}),
         catchError(err => {let Notification = {msg: 'Action Not Successful'}; return of(notify({Notification})) })
      )))})

  constructor(private actions$: Actions, private us: UserService, private store: Store) {
  }
}


