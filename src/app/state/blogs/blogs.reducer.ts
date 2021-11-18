import {Action, createReducer, on} from "@ngrx/store";
import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";

import {Blog} from "../../services/blogs/blog";
import {setBlogs, setBlog, updateBlog} from "./blogs.actions";

function sortByLikes(a: Blog, b: Blog): number{
  return b.likes - a.likes
}

export interface BlogState extends EntityState<Blog>{
}

export const blogsAdapter:EntityAdapter<Blog> = createEntityAdapter<Blog>({sortComparer: sortByLikes})

export const initialState: BlogState = blogsAdapter.getInitialState({})

const blogReducer = createReducer(
  initialState,
  on(setBlog, (state, {blog}) => blogsAdapter.setOne(blog, state)),
  on(setBlogs, (state, {blogs}) => blogsAdapter.addMany(blogs, state)),
  on(updateBlog, (state, {update}) => blogsAdapter.updateOne(update, state))
  )

export function reducer(state: BlogState | undefined, action: Action) {return blogReducer(state, action)}
