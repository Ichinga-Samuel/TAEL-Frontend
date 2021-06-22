import {Action, createReducer, on} from "@ngrx/store";
import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";

import {BookResult} from "../../services/book_result";
import {addBooks, loadLatest, setBooks, clearBooks} from "./book.actions";

export interface BooksState extends EntityState<BookResult>{

}

export const booksAdapter:EntityAdapter<BookResult> = createEntityAdapter<BookResult>()

export const initialState: BooksState = booksAdapter.getInitialState({})

const bookReducer = createReducer(
  initialState,
  on(addBooks, (state, {books}) => booksAdapter.addMany(books, state)),
  on(setBooks, (state, {books}) => booksAdapter.setMany(books, state)),
  on(clearBooks, (state, {books}) => booksAdapter.removeAll(state)),
  )

export function reducer(state: BooksState | undefined, action: Action) {return bookReducer(state, action)}
