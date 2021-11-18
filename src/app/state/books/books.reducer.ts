import {Action, createReducer, on} from "@ngrx/store";
import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";

import {Book} from "../../services/books/book";
import {addBooks, setBooks, clearBooks, setBook, updateBook} from "./books.actions";


function sortByDownloads(a: Book, b:Book): number{
  return b.downloads - a.downloads
}

export interface BooksState extends EntityState<Book>{
}

export const booksAdapter:EntityAdapter<Book> = createEntityAdapter<Book>({sortComparer: sortByDownloads})

export const initialState: BooksState = booksAdapter.getInitialState({})

const bookReducer = createReducer(
  initialState,
  on(addBooks, (state, {books}) => booksAdapter.addMany(books, state)),
  on(setBook, (state, {book}) => booksAdapter.setOne(book, state)),
  on(setBooks, (state, {books}) => booksAdapter.setMany(books, state)),
  on(updateBook, (state, {update}) => booksAdapter.updateOne(update, state)),
  on(clearBooks, (state, {books}) => booksAdapter.removeAll(state)),
  )

export function reducer(state: BooksState | undefined, action: Action) {return bookReducer(state, action)}
