// import { Actions, createEffect, ofType } from '@ngrx/effects';
import {Action, createReducer} from "@ngrx/store";
import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";
import {BookResult} from "../../services/book_result";

export interface State extends EntityState<BookResult>{
  userId: string | number | null
}
