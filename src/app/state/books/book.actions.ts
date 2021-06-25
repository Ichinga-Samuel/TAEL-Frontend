import {createAction, props} from "@ngrx/store";
import {Update, Predicate} from "@ngrx/entity";

import {BookResult} from "../../services/book_result";

export const loadLatest = createAction('Load Books')
export const getBook = createAction('Get Book', props<{ query: string }>())
export const searchBook = createAction('Search', props<{query: string}>())
export const addBooks = createAction('Add Books', props<{books: BookResult[]}>())
export const setBook = createAction('Set Book', props<{book: BookResult}>())
export const setBooks =  createAction('Set Books', props<{books: BookResult[]}>())
export const clearBooks =  createAction('Clear Books', props<{books: BookResult[]}>())
