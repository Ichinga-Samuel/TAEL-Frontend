import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'

import {Router} from "@angular/router";
import {notify} from "../state";
import {signup, SignupState} from "../state/user/user.actions";
import {EmailValidatorService} from "../services/user/email-validator.service";
import {Title} from "@angular/platform-browser";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userReg: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private router: Router, private emailValidator: EmailValidatorService, private ts: Title, private us: UserService) {

    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    this.userReg = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], emailValidator.validate.bind(this.emailValidator)],
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
    }
  }

  ngOnInit(): void {
    this.ts.setTitle('Sign up Page of The African Ebook Library')
    this.store.select(notify).subscribe(res => {
      if(res.status === 'created'){
        this.router.navigate(['/login'])
      }
    })
    // @ts-ignore
  }

}
