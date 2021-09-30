import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType, concatLatestFrom} from "@ngrx/effects";
import {catchError, exhaustMap, map, mergeMap, take} from "rxjs/operators";
import {login, setUser, signup, logout, resetUser, mark, reset, PwdReset, resetEmail} from "./user.actions";
import {setBooks} from "../books/books.actions";
import {Store, select} from "@ngrx/store";
import {Notifications, notify} from "../notify/notify.actions";
import {UserService} from "../../services/user/user.service";
import {of} from "rxjs";
import {not} from "rxjs/internal-compatibility";
import {notifi, notify as nott} from "../index";

@Injectable()
export class UserEffects{

  user$ = createEffect(() => {
    return this.actions$.pipe(ofType(login), exhaustMap(action => this.us.login({email:action.email, password: action.password}).pipe(
      map((res) => {if(res.user){this.store.dispatch(setUser({user:res.user}))}
      this.store.dispatch(notify({Notification: {notice: res.msg, status: res.status, login: res.status, token: res.token || '', alert: res.status?'alert-info': 'alert-success'} }))}),
      catchError(err => {
        this.store.dispatch(notify({Notification: {notice: 'Unable to Login', status: "logged out", login: false}}));
        return of()
      }),
    ))
    )
  }, {dispatch: false})

  emailreset$ = createEffect( () => {
    return this.actions$.pipe(ofType(resetEmail), exhaustMap(action => this.us.resetEmail(action.email).pipe(
      map(res => {let Notification = {msg: res.msg, status: res.status, login: false, notice: res.msg, alert: 'alert-success'};
      this.store.dispatch(notify({Notification: Notification}));
      return notify({Notification})}),
      catchError(err => {let Notification = {msg: "Unable to Start Password Reset", status: false, login: false, notice: "Unable to Start Password Reset", alert: 'alert-warning'};
      this.store.dispatch(notify({Notification: Notification}));
      return of(notify({Notification}))}),
    )))
  })

  sign$ = createEffect(() => this.actions$.pipe(ofType(signup), exhaustMap(action => this.us.createUser(action.user).pipe(
    map(res => {let Notification = {notice: res.msg, status: "created", login: false}; this.store.dispatch(notify({Notification: Notification})); return notify({Notification})}),
    catchError(err => {let Notification = {notice: 'Unable to Create User Account', status: "not created", alert: 'alert-warning', login: false,};
    this.store.dispatch(notify({Notification: Notification})); return of(notify({Notification})) })
    )
  )))

  reset$ = createEffect( () => this.actions$.pipe(ofType(reset), exhaustMap(action => this.us.reset(action.state).pipe(
    map(res => {let Notification = {status: 'reset', login: false, notice: res.msg}; this.store.dispatch(notify({Notification: Notification})); return notify({Notification})}),
    catchError(err => {let Notification = {msg: "Unable to Reset Password", status: false, login: false, notice: "Unable to Reset Password. Try Again"};
    this.store.dispatch(notify({Notification: Notification})); return of(notify({Notification}))}),
  ))))

  mark$ = createEffect(() => {
      return this.actions$.pipe(ofType(mark), exhaustMap(action => this.us.mark({uid:action.uid, title:action.title}).pipe(
        map(res => {
          // @ts-ignore
          this.store.dispatch(setUser({user: res.user})); this.store.dispatch(notify({Notification: {notice:res.msg}}))}),
         catchError(err => {let Notification = {notice: 'Action Not Successful'}; this.store.dispatch(notify({Notification: Notification})); return of() })
      )))}, {dispatch: false})

  constructor(private actions$: Actions, private us: UserService, private store: Store) {
  }
}


// user$ = createEffect(() => {
//     return this.actions$.pipe(ofType(login), exhaustMap(action => this.us.login({email:action.email, password: action.password}).pipe(
//       map((res) => {if(res.user){this.store.dispatch(setUser({user:res.user}))}; return res}), map((res) => {let Notification = {msg: '', notice: res.msg, status: "res.status", login: res.status, token: res.token, alert: res.status?'alert-info': 'alert-success'}; return notify({Notification}) }),
//       catchError(err => {let Notification = {notice: 'Unable to Login', status: "logged out", login: false}; this.store.dispatch(notify({Notification: Notification})); throw err}),
//     ))
//     )
//   })
