import {createSelector, createFeatureSelector} from "@ngrx/store";
import {Notifications} from "./notify.reducer";


const notifications = createFeatureSelector<Notifications>('notify')

export const notify = createSelector(
  notifications,
  (notification) => (notification)
)


