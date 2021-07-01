import {Action, createReducer, on} from "@ngrx/store";
import {User} from "../../services/user/user_object";
import {setUser, logout} from "./user.actions";
import {AppState} from "../index";
import {defaultState} from "../notify/notify.reducer";

export interface UserState extends User{

}

export const initialState: UserState = {
    id: '',
    name: '',
    email: '',
    reviews: [],
    favourites: []
}

const userReducer = createReducer(
  initialState,

  on(setUser, (state, {user}) => user)
)

export function reducer(state: UserState | undefined, action: Action) {return userReducer(state, action)}

//on(logout, (state, {notify}) => {
//     initialState; return initialState
//   })
