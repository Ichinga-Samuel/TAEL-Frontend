import {on, Action, createReducer} from "@ngrx/store";
import {notify} from "./notify.actions";


export interface Notifications {
  msg: string,
  status: string,
  login: boolean,
  token: string
}

export interface LoginState {
  msg: string,
  login: boolean,
}

export const defaultState: Notifications = {
  msg: "",
  status: "Logged out",
  login: false,
  token: ""
}

const notifyReducer = createReducer(
  defaultState,
  on(notify, (state, {Notification}) => ({...state,...Notification}))
)

export function reducer(state: Notifications | undefined, action: Action){
  return notifyReducer(state, action)
}
