import {Action, createReducer, on} from "@ngrx/store";
import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";

import {Author} from "../../services/author";
import {loadAll, searchAuthor, setAuthors, setAuthor} from "./authors.action";


export interface AuthorsState extends EntityState<Author>{

}

export const authorsAdapter: EntityAdapter<Author> = createEntityAdapter<Author>()

export const initialState:AuthorsState = authorsAdapter.getInitialState({})

const authorsReducer = createReducer(
  initialState,
  on(setAuthors, (state, {authors}) => authorsAdapter.addMany(authors, state)),
  on(setAuthor, (state, {author}) => authorsAdapter.setOne(author, state)),
  )

export function reducer(state: AuthorsState | undefined, action: Action) {return authorsReducer(state, action)}
