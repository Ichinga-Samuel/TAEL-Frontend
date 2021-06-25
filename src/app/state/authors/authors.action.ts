import {createAction, props} from "@ngrx/store";
import {Update, Predicate} from "@ngrx/entity";
import {Author} from "../../services/author";


export const loadAll = createAction('Load Authors')
export const setAuthor = createAction('Add Author', props<{author: Author}>())
export const searchAuthor = createAction('Search', props<{query: string}>())
export const setAuthors = createAction('Add Authors', props<{authors: Author[]}>())
