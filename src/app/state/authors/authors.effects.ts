import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {catchError, exhaustMap, map} from "rxjs/operators";

import {Author} from "../../services/authors/author";
import {AuthorsService} from "../../services/authors/authors.service";
import {loadAll, setAuthors, getAuthor, setAuthor, searchAuthor} from "../index";



@Injectable()
export class AuthorsEffects{
  all$ = createEffect(() => {
    return this.action$.pipe(ofType(loadAll), exhaustMap(() => this.aus.getAll().pipe(map((authors: Author[]) => setAuthors({authors})
      ), catchError(() => [])))
    )
  })

  one$ = createEffect(() => {
    return this.action$.pipe(ofType(getAuthor), exhaustMap((id) => this.aus.getAuthor(id.id).pipe(map((author:Author) => setAuthor({author}),
      catchError(() => [])))))
  })

  search$ = createEffect(() => {
    return this.action$.pipe(ofType(searchAuthor), exhaustMap((query) => this.aus.search(query.query).pipe(map((authors: Author[]) => setAuthors({authors})
      ), catchError(() => [])))
    )
  })
  constructor(private action$: Actions, private aus: AuthorsService) {

  }
}
