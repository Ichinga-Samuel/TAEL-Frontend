import {on, Action, createReducer} from "@ngrx/store";
import {notify, Notify} from "./notify.actions";


export interface Notifications extends Notify{

}

export const defaultState: Notifications = {
  msg: "",
  status: "",
  login: false,
  token: "",
  notice: "",
  alert: 'alert-primary'
}

const notifyReducer = createReducer(
  defaultState,
  on(notify, (state, {Notification}) => ({...state,...Notification}))
)

export function reducer(state: Notifications | undefined, action: Action){
  return notifyReducer(state, action)
}
