import {createAction, props} from "@ngrx/store";
import {User} from "../../services/user/user_object";


export interface SignupState{
  email: string,
  name: string,
  password: string,
  cpassword: string,
}

export const login = createAction(
  '[Login Page] Login',
  props<{email: string; password: string}>()
)

export const logout = createAction(
  '[Login Page] Login',
)


export const setUser = createAction(
  '[User Page] User',
  props<{user: User}>()
)

export const resetUser = createAction(
  '[User Page] User'
)

export const signup = createAction(
  '[Sign Up] Sign Up',
  props<{user:SignupState}>()
)

export const mark = createAction(
  'User Favourites',
  props<{title: string, uid: string}>()
)
