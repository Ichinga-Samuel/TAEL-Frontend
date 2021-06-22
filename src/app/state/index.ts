import {createFeatureSelector, createSelector} from "@ngrx/store";

import {UserState} from "./user/user.reducer";
import {Notifications} from "./notify/notify.reducers";
import {booksAdapter, BooksState} from "./books/books.reducer";
import {BookResult} from "../services/book_result";
import {selectUrl, selectRouteParams} from "./router.selectors"

export {BooksEffects} from "./books/books.effects"
export {UserEffects} from "./user/user.effects"


export interface AppState{
  user: UserState,
  notify: Notifications,
  books: BooksState
}

const {selectEntities, selectAll} = booksAdapter.getSelectors()
const booksSelector = createFeatureSelector<BooksState>('books')
export const books = createSelector(
  booksSelector,
  selectAll,

)

export const bookEntities = createSelector(
  booksSelector,
  selectEntities,
)

export const selectBook = createSelector(
  bookEntities,
  selectRouteParams,
  (books, {id}) => books[id]
)

export const userSelector = createFeatureSelector<AppState, UserState>('user')

export const selectUser = createSelector(
  userSelector,
  (user:UserState) => user
)

export const notify = createSelector(
  (state: AppState) => state,
  (notification) => ({...notification.notify, ...notification.user})
)
