import {createAction, props} from "@ngrx/store";
import {Notifications, LoginState} from "./notify.reducers";
export {LoginState, Notifications} from "./notify.reducers"


export const loginError = createAction(
  '[Login Page] Login Error',
  props<{loginErr: LoginState}>()
)

export const logout = createAction(
  '[Login Page] Login',
)

export const notify = createAction(
  'Notification',
  props<{Notification: Notifications}>()
)
