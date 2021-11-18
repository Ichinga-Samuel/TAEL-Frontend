import {blogsAdapter, BlogState} from "./blogs.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

import {selectRouteParams} from "../router.selectors";
const {selectEntities, selectAll} = blogsAdapter.getSelectors()
const blogsSelector = createFeatureSelector<BlogState>('blogs')

export const blogs = createSelector(
  blogsSelector,
  selectAll,
)

export const blogEntities = createSelector(
  blogsSelector,
  selectEntities,
)

export const selectBlog = createSelector(
  blogEntities,
  selectRouteParams,
  (blogs, {id}) => blogs[id]
)
