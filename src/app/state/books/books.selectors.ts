import {booksAdapter, BooksState} from "./books.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectRouteParams} from "../router.selectors";
import {Book} from "../../services/books/book";


const {selectEntities, selectAll} = booksAdapter.getSelectors()
const booksSelector = createFeatureSelector<BooksState>('books')

export const books = createSelector(
  booksSelector,
  selectAll,
)

export const popular = createSelector(
  books,
  (books) => {
    let p = books.slice(0, 10).filter(b => b.title !== null); console.log(p.length); return p
  }
)

export const bookEntities = createSelector(
  booksSelector,
  selectEntities,
)

export const novels = createSelector(
  books,
  (books) => {
    let book: Book[] = []
    for(let b of books){
      if(b.branch === 'Novel'){
        book.push(b)
      }
    }
    return book
  }
)

export const textbooks = createSelector(
  books,
  (books) => {
    let book: Book[] = []
    for(let b of books){
      if(b.branch === 'Textbook'){
        book.push(b)
      }
    }
    return book
  }
)

export const selectBook = createSelector(
  bookEntities,
  selectRouteParams,
  (books, {id}) => books[id]
)
