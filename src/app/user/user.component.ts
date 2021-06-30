import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'

import {Router} from "@angular/router";
import {notify} from "../state";
import {signup, SignupState} from "../state/user/user.actions";
import {EmailValidatorService} from "../services/user/email-validator.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  msg: string = '';
  public error: boolean = false;
  userReg: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private router: Router, private emailValidate: EmailValidatorService, private ts: Title) {

    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    this.userReg = fb.group({
      name: ['', Validators.required],
      email: ['', {updateOn: 'submit'}, [Validators.required, Validators.email, emailValidate.validate]],
      password: ['', Validators.compose([Validators.required, Validators.pattern(mediumRegex)])],
      cpassword: ['', Validators.required]
    }, {validators: this.confirmPassword})

  }
  confirmPassword: ValidatorFn = (control: AbstractControl):ValidationErrors | null => {
          const pwd = control.get('password');
          const cpwd = control.get('cpassword');
          return pwd?.value !== cpwd?.value ? {noMatch: true}: null;
  }

  register(form:FormGroup):void{
    if(form.valid){
      let user:SignupState = form.value;
      this.store.dispatch(signup({user}))
      this.store.pipe(select(notify)).subscribe(value => {this.msg = value.msg; this.error = (value.status==='not created')})
    }
  }

  ngOnInit(): void {
    this.ts.setTitle('Sign up Page of The African Ebook Library')
    // @ts-ignore
    this.store.pipe(select(notify)).subscribe(
      value => {if(value.status==='created'){this.router.navigate(['/login'])}
      }
    )
  }

}
