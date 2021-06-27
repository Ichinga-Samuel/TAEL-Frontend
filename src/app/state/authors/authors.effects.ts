import {Injectable} from "@angular/core"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {catchError, exhaustMap, map} from "rxjs/operators";

import {Author} from "../../services/author";
import {AuthorsService} from "../../services/authors.service";
import {loadAll, setAuthors, getAuthor, setAuthor, searchAuthor} from "../index";



@Injectable()
export class AuthorsEffects{
  all$ = createEffect(() => {
    return this.action$.pipe(ofType(loadAll), exhaustMap(() => this.aus.getAll().pipe(map((authors: Author[]) => setAuthors({authors})
      ), catchError(() => [])))
    )
  })

  one$ = createEffect(() => {
    // @ts-ignore
    return this.action$.pipe(ofType(getAuthor), exhaustMap((id) => this.aus.getAuthor(id.id).pipe(map((author:Author) => {return setAuthor({author})},
      catchError((err) => {throw err})))))
  })

  search$ = createEffect(() => {
    // @ts-ignore
    return this.action$.pipe(ofType(searchAuthor), exhaustMap((query: string) => this.aus.search(query).pipe(map((authors: Author[]) => setAuthors({authors})
      ), catchError(() => [])))
    )
  })
  constructor(private action$: Actions, private aus: AuthorsService) {

  }
}
