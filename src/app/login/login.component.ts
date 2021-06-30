import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store, select} from "@ngrx/store";
import {FormBuilder, FormGroup} from '@angular/forms'
import {login} from "../state/user/user.actions";
import {notify} from "../state";
import {Router, ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public msg: string = ''
  public error: boolean = false
  public redirectUrl: string = '/home'
  loginForm: FormGroup
  constructor(private fg: FormBuilder, private router: Router, private store: Store, private route: ActivatedRoute, private ts: Title) {
    this.loginForm = fg.group({
      email: [''],
      password: [''],
    })
  }

  login(form: FormGroup){
    if(form.valid){
      this.store.dispatch(login({email: form.value.email, password: form.value.password}))
      this.store.pipe(select(notify)).subscribe(value => {this.msg = value.msg; this.error = !value.login})
    }
  }
  ngOnInit(): void {
    this.error = false;
    this.ts.setTitle('Login Page of The African Ebook Library')
    let url = this.route.snapshot.queryParamMap.get('redirectUrl')
    this.redirectUrl = url ? url: this.redirectUrl
    // @ts-ignore
    this.store.pipe(select(notify)).subscribe(value => {if(value.login){this.router.navigate([`${this.redirectUrl}`])} })
  }
}
