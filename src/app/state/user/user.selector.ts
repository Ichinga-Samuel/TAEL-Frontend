import {UserState} from "./user.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";


export const userSelector = createFeatureSelector<UserState>('user')

export const selectUser = createSelector(
  userSelector,
  (user:UserState) => (user)
)
