import {createAction, props} from "@ngrx/store";
import {Notifications, LoginState} from "./notify.reducer";
export {LoginState, Notifications} from "./notify.reducer"


export const loginError = createAction(
  '[Login Page] Login Error',
  props<{loginErr: LoginState}>()
)


export const notify = createAction(
  'Notification',
  props<{Notification: Notifications}>()
)
