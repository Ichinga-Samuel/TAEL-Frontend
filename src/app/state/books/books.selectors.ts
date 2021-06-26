import {booksAdapter, BooksState} from "./books.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectRouteParams} from "../router.selectors";


const {selectEntities, selectAll} = booksAdapter.getSelectors()
const booksSelector = createFeatureSelector<BooksState>('books')

export const books = createSelector(
  booksSelector,
  selectAll,
)

export const popular = createSelector(
  books,
  (books) => books.slice(0, 10)
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
