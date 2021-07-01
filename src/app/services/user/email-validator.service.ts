import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {UserService} from "./user.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor(private us: UserService) { }
  validate(ctrl: AbstractControl): Observable<ValidationErrors | null>{
    return this.us.emailValidate(ctrl.value).pipe(map(res => (!res.status ? {emailAvailable: true} : null)), catchError(() => of(null)))
  }
}
