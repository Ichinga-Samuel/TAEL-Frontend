import {ActionReducerMap, ActionReducer, MetaReducer, Action, createReducer, on} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import {UserState, initialState as userInit} from "./user/user.reducer";
import {Notifications, defaultState as notifyInit, defaultState} from "./notify/notify.reducer";
import {AuthorsState, initialState as authorsInit} from "./authors/authors.reducer"
import {BooksState, initialState as booksInit} from "./books/books.reducer";

// effects
export {BooksEffects} from "./books/books.effects"
export {UserEffects} from "./user/user.effects"
export {AuthorsEffects} from "./authors/authors.effects"

// selectors and actions
export {logout, mark} from "./user/user.actions"
export {notify} from "./notify/notify.selectors"
export {books, selectBook, popular, novels, textbooks} from "./books/books.selectors"
export {authorsEntities, selectauthor, selectauthors} from "./authors/authors.selector"
export {selectUser} from "./user/user.selector"
export {getBook, setBook, setBooks, addBooks, loadLatest, postReview, updateDownloads, rateBook, getBooks} from "./books/books.actions"
export {loadAll, setAuthors, searchAuthor, setAuthor, getAuthor} from "./authors/authors.action"


// reducers
export {reducer as booksReducer} from "./books/books.reducer"
export {reducer as authorsReducer} from "./authors/authors.reducer"
export {reducer as notifyReducer} from "./notify/notify.reducer"
export {reducer as userReducer} from "./user/user.reducer"

import {reducer as booksReducer} from "./books/books.reducer"
import {reducer as authorsReducer} from "./authors/authors.reducer"
import {reducer as notifyReducer} from "./notify/notify.reducer"
import {reducer as userReducer} from "./user/user.reducer"
import {notify} from "./notify/notify.actions";


export interface AppState{
  user: UserState,
  notify: Notifications,
  books: BooksState,
  authors: AuthorsState
}

const reducers: ActionReducerMap<AppState> = {user: userReducer, notify: notifyReducer, books: booksReducer, authors: authorsReducer};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['user', 'notify', 'books', 'authors'], rehydrate: true})(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
