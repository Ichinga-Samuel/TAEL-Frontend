import {on, Action, createReducer} from "@ngrx/store";
import {loginError, logout, notify} from "./notify.actions";
import {not} from "rxjs/internal-compatibility";

export interface Notifications {
  msg: string,
  status: string,
  login: boolean
}

export interface LoginState {
  msg: string,
  login: boolean,
}

export const defaultState: Notifications = {
  msg: "Not logged in",
  status: "Logged out",
  login: false
}

const notifyReducer = createReducer(
  defaultState,
  on(loginError, (state, {loginErr}) => ({...state, ...loginErr})),
  on(logout, (state) => defaultState),
  on(notify, (state, {Notification}) => ({...state,...Notification}))
)

export function reducer(state: Notifications | undefined, action: Action){
  return notifyReducer(state, action)
}
