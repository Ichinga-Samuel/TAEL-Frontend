import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BlogService} from "../../services/blogs/blogs.service";

import {Store} from "@ngrx/store";
import {loadLatest, getBlogs, likes, searchBlog, setBlogs, setBlog, getBlog, createBlog, updateBlog} from "./blogs.actions";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
import {Notifications, notify} from "../notify/notify.actions";


@Injectable()
export class BlogEffects{
  latest$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadLatest), exhaustMap(action => this.bs.latest().pipe(
      map(blogs => setBlogs({blogs})), catchError(err => {throw err})
    )))
  })

  likes$ = createEffect(() => {
    return this.actions$.pipe(ofType(likes), exhaustMap(id => this.bs.like(id.id, id.uid).pipe(
      map((blog) => updateBlog({update: blog})), catchError(err => {throw err })
    )))
  })

  search$ = createEffect(() => {
    return this.actions$.pipe(ofType(searchBlog), exhaustMap(query => this.bs.search(query.query).pipe(
      map(blogs => {return setBlogs({blogs}); }), catchError(err => [])
    )))
  })

  blog$ = createEffect(() => {
    return this.actions$.pipe(ofType(getBlog), exhaustMap(id => this.bs.getBlog(id.id).pipe(
      map((blog) => setBlog({blog})), catchError(err => {
        throw err
      })
    )))
  })

  create$ = createEffect(() => {
    return this.actions$.pipe(ofType(createBlog), exhaustMap(body => this.bs.create(body.body).pipe(
      map((res) => notify({Notification: {notice:res.msg}})), catchError(err => {throw err})
    )))
  })

  constructor(private actions$: Actions, private bs: BlogService, private store: Store) {
  }
}
