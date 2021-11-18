import {createAction, props} from "@ngrx/store";
import {Update, Predicate} from "@ngrx/entity";
import {Author} from "../../services/authors/author";


export const loadAll = createAction('Load Authors')
export const getAuthor = createAction('Get Authors', props<{id: string}>())
export const setAuthor = createAction('Add Author', props<{author: Author}>())
export const searchAuthor = createAction('Search Authors', props<{query: string}>())
export const setAuthors = createAction('Add Authors', props<{authors: Author[]}>())
