import {createAction, props} from "@ngrx/store";
import {User} from "../../user/services/user_object";


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

export const setUser = createAction(
  '[User Page] User',
  props<{user: User}>()
)

export const signup = createAction(
  '[Sign Up] Sign Up',
  props<{user:SignupState}>()
)
