import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from "@ngrx/store";
import {BlogService} from "./blogs.service";
import {Blog} from "./blog";
import {Observable, of} from "rxjs";
import {getBlog, selectBlog} from "../../state";
import {catchError, exhaustMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BlogResolverService implements Resolve<Blog>{

  constructor(private store: Store, private bs: BlogService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog> | Observable<never>{
    const id = route.paramMap.get('id')!
    // @ts-ignore
    return this.store.select(selectBlog).pipe(take(1), exhaustMap((blog:Blog) => {
      if(!blog){this.store.dispatch(getBlog({id}))} return of(blog)
    //  # Todo: Fix Book Recommendations
    }), catchError(() => of([])))


  }
}
