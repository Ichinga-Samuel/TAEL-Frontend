import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {Blog} from "../../services/blogs/blog";

export const searchBlog = createAction('Search', props<{query: string}>())
export const loadLatest = createAction('Latest Blogs')
export const getBlogs = createAction('Get Blogs')
export const updateBlog = createAction('Update Blog', props<{update: Update<Blog>}>())
export const setBlog = createAction('Set Blog', props<{blog: Blog}>())
export const setBlogs =  createAction('Set Blogs', props<{blogs: Blog[]}>())
export const getBlog = createAction('Get Blog', props<{ id: string }>())
export const likes = createAction('likes', props<{id: string, uid?: string}>())
export const createBlog =createAction('Create Blog', props<{body: any}>())
