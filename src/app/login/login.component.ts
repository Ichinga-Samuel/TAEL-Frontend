import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'
import {login} from "../state/user/user.actions";
import {notify, selectUser} from "../state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msg: string = ''
  public status: boolean = false
  loginForm: FormGroup
  constructor(private fg: FormBuilder, private router: Router, private store: Store) {
    this.loginForm = fg.group({
      email: [''],
      password: [''],
    })
  }

  login(form: FormGroup){
    if(form.valid){
      this.store.dispatch(login({email: form.value.email, password: form.value.password}))
    }
  }
  ngOnInit(): void {
    // @ts-ignore
    this.store.pipe(select(notify)).subscribe(value => {this.msg = value.msg; this.status = value.login;
    if(this.status){this.router.navigate(['/home'])} })
  }
}
