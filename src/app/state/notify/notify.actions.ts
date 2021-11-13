import {createAction, props} from "@ngrx/store";
export {Notifications} from "./notify.reducer"


export interface Notify{
  msg?: string,
  status?: string | boolean,
  login?: boolean,
  token?: string,
  notice?: string,
  alert?: string
}

export const notify = createAction(
  'Notification',
  props<{Notification: Notify}>()
)
