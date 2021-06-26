import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectRouteParams} from "../router.selectors"

import {authorsAdapter, AuthorsState} from "./authors.reducer";


export const authorSelector = createFeatureSelector<AuthorsState>('authors')
export const {selectEntities, selectAll} = authorsAdapter.getSelectors()

export const authorsEntities = createSelector(
  authorSelector,
  selectEntities,
)
export const authors =createSelector(
  authorSelector,
  selectAll
)
export  const author = createSelector(
  authorsEntities,
  selectRouteParams,
  (authors, {id}) => authors[id]
)
