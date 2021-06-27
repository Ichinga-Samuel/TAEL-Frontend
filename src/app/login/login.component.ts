import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'
import {login} from "../state/user/user.actions";
import {notify, selectUser} from "../state";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msg: string = ''
  public status: boolean = false
  public redirectUrl: string = '/home'
  loginForm: FormGroup
  constructor(private fg: FormBuilder, private router: Router, private store: Store, private route: ActivatedRoute) {
    this.loginForm = fg.group({
      email: [''],
      password: [''],
    })
  }

  login(form: FormGroup){
    if(form.valid){
      this.store.dispatch(login({email: form.value.email, password: form.value.password}))
      this.status = true
    }
  }
  ngOnInit(): void {
    let url = this.route.snapshot.queryParamMap.get('redirectUrl')
    this.redirectUrl = url ? url: this.redirectUrl
    // @ts-ignore
    this.store.pipe(select(notify)).subscribe(value => {this.msg = value.msg; this.status = value.login;
    if(value.login){this.router.navigate([`${this.redirectUrl}`])} })
  }
}
