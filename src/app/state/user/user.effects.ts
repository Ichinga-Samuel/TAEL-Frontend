import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, mergeMap} from "rxjs/operators";
import {login, setUser, signup, SignupState} from "./user.actions";
import {Store} from "@ngrx/store";
import {Notifications, notify} from "../notify/notify.actions";
import {UserService} from "../../services/user/user.service";
import {of} from "rxjs";

@Injectable()
export class UserEffects{
  user$ = createEffect(() => {
    return this.actions$.pipe(ofType(login), exhaustMap(action => this.us.login({email:action.email, password: action.password}).pipe(
      map(user => {this.store.dispatch(setUser({user})); return user}), map(user => {let Notification: Notifications = {msg: `Logged in as ${user.name}`, status: "Logged in", login: true}; return notify({Notification})}),
      catchError(err => {let Notification: Notifications = {msg: 'Unable to Login', status: "logged out", login: false}; return of(notify({Notification}))}),

    ))
    )
  })

  sign$ = createEffect(() => this.actions$.pipe(ofType(signup), exhaustMap(action => this.us.createUser(action.user).pipe(
    map(res => {let Notification: Notifications = {msg: `User Account Created`, status: "created", login: false}; return notify({Notification})}),
    catchError(err => {let Notification: Notifications = {msg: 'Unable to Create User Account', status: "not created", login: false}; return of(notify({Notification})) })
    )
  )))
  constructor(private actions$: Actions, private us: UserService, private store: Store) {
  }
}


