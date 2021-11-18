import {createAction, props} from "@ngrx/store";
import {User} from "../../services/user/user_object";
// import {UserState} from "./user.reducer";


export interface SignupState{
  email: string,
  name: string,
  password: string,
  cpassword: string,
}

export interface PwdReset{
  token: string,
  password: string,
  cpassword: string,
}

export const login = createAction(
  'Login',
  props<{email: string; password: string}>()
)

export const updateUser = createAction('Update User', props<{update: any}>())

export const setUser = createAction(
  'Set User',
  props<{user: User}>()
)

export const resetUser = createAction(
  'Reset User'
)

export const reset = createAction(
  'Reset Password Reset',
  props<{state: PwdReset}>()
)

export const resetEmail = createAction(
  'Email Reset',
  props<{email: string}>()
)

export const signup = createAction(
  'Sign Up',
  props<{user:SignupState}>()
)

export const mark = createAction(
  'User Favourites',
  props<{title: string, uid: string, action: string}>()
)
