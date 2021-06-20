import {Action, createReducer} from "@ngrx/store";
import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";
import {User} from "../../user/services/user_object";

export interface State extends EntityState<User>{
  userId: string | number | null
}
