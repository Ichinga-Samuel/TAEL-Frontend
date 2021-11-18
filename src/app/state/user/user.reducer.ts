import {Action, createReducer, on} from "@ngrx/store";
import {User} from "../../services/user/user_object";
import {setUser, resetUser, updateUser} from "./user.actions";


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
  on(resetUser, (state) => ({...state, ...initialState})),
  on(setUser, (state, {user}) => ({...state, ...user})),
  on(updateUser, (state, {update}) => ({...state, ...update}))
)

export function reducer(state: UserState | undefined, action: Action) {return userReducer(state, action)}
