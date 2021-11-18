import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map} from "rxjs/operators";
import {login, setUser, signup, mark, reset, resetEmail, updateUser} from "./user.actions";
import {Store} from "@ngrx/store";
import {notify} from "../notify/notify.actions";
import {UserService} from "../../services/user/user.service";


@Injectable()
export class UserEffects{

  user$ = createEffect(() => {
    return this.actions$.pipe(ofType(login), exhaustMap(action => this.us.login({email:action.email, password: action.password}).pipe(
      map((res) => {if(res.user){this.store.dispatch(setUser({user:res.user}))}
      return notify({Notification: {notice: res.msg, status: res.status, login: res.status, token: res.token || '', alert: res.status?'alert-info': 'alert-success'}})}),
      catchError(err => {this.store.dispatch(notify({Notification: {notice: 'Unable to Login', status: "logged out", login: false}}));
        throw err
      }),
    ))
    )
  })

  emailreset$ = createEffect( () => {
    return this.actions$.pipe(ofType(resetEmail), exhaustMap(action => this.us.resetEmail(action.email).pipe(
      map(res => notify({Notification: {msg: res.msg, status: res.status, login: false, notice: res.msg, alert: 'alert-success'}})),
      catchError(err => {this.store.dispatch(notify({Notification: {msg: "Unable to Start Password Reset", status: false, login: false, notice: "Unable to Start Password Reset", alert: 'alert-warning'}}));
      throw err})
    )))
  })

  sign$ = createEffect(() => this.actions$.pipe(ofType(signup), exhaustMap(action => this.us.createUser(action.user).pipe(
    map(res => notify({Notification: {notice: res.msg, status: "created", login: false}})),
    catchError(err => {this.store.dispatch(notify({Notification: {notice: 'Unable to Create User Account', status: "not created", alert: 'alert-warning', login: false,}})); throw err })
    )
  )))

  reset$ = createEffect( () => this.actions$.pipe(ofType(reset), exhaustMap(action => this.us.reset(action.state).pipe(
    map(res => notify({Notification: {status: 'reset', login: false, notice: res.msg}})),
    catchError(err => {this.store.dispatch(notify({Notification: {msg: "Unable to Reset Password", status: false, login: false, notice: "Unable to Reset Password. Try Again"}})); throw err }),
  ))))

  mark$ = createEffect(() => {
      return this.actions$.pipe(ofType(mark), exhaustMap(action => this.us.mark({uid:action.uid, title:action.title, action: action.action}).pipe(
        map(res => {this.store.dispatch(updateUser({update: {favourites: res.data}})); return notify({Notification: {notice:res.msg}})}),
         catchError(err => {this.store.dispatch(notify({Notification: {notice: 'Action Not Successful'}})); throw err })
      )))})

  constructor(private actions$: Actions, private us: UserService, private store: Store) {
  }
}

