import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from "@ngrx/store";
import {BlogService} from "./blogs.service";
import {Blog} from "./blog";
import {EMPTY, Observable, of} from "rxjs";
import {loadLatestBlog, blogs} from "../../state";
import {catchError, exhaustMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BlogsResolverService implements Resolve<Blog[]>{

  constructor(private store: Store, private bs: BlogService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog[]> | Observable<never>{
    return this.store.select(blogs).pipe(take(1), exhaustMap((blogs: Blog[]) => {
      if(blogs.length < 2 ){this.store.dispatch(loadLatestBlog())} return of(blogs)

    }), catchError(() => EMPTY))
  }
}
