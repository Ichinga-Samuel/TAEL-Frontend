import {UserState} from "./user/user.reducer";
import {Notifications} from "./notify/notify.reducer";
import {AuthorsState} from "./authors/authors.reducer"
import {BooksState} from "./books/books.reducer";

// effects
export {BooksEffects} from "./books/books.effects"
export {UserEffects} from "./user/user.effects"
export {AuthorsEffects} from "./authors/authors.effects"

// selectors and actions
export {notify} from "./notify/notify.selectors"
export {books, selectBook, popular} from "./books/books.selectors"
export {authorsEntities, author, authors} from "./authors/authors.selector"
export {selectUser} from "./user/user.selector"
export {getBook, setBook, setBooks, addBooks, loadLatest, postReview, updateDownloads} from "./books/books.actions"
export {loadAll, setAuthors, searchAuthor, setAuthor, getAuthor} from "./authors/authors.action"


// reducers
export {reducer as booksReducer} from "./books/books.reducer"
export {reducer as authorsReducer} from "./authors/authors.reducer"
export {reducer as notifyReducer} from "./notify/notify.reducer"
export {reducer as userReducer} from "./user/user.reducer"


export interface AppState{
  user: UserState,
  notify: Notifications,
  books: BooksState,
  authors: AuthorsState
}
