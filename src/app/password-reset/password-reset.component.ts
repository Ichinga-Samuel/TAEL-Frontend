import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PwdReset, reset, notify} from "../state";
import {Store, select} from "@ngrx/store";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  pwdForm: FormGroup;
  token: string = ''
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store, private router: Router) {
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    this.pwdForm = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern(mediumRegex)])],
      cpassword: ['', Validators.required]
    }, {validators: this.confirmPassword})
  }

  confirmPassword: ValidatorFn = (control: AbstractControl):ValidationErrors | null => {
      const pwd = control.get('password');
      const cpwd = control.get('cpassword');
      return pwd?.value !== cpwd?.value ? {noMatch: true}: null;
  }

  resetPwd(form: FormGroup){
    if(form.valid){
      let pwdReset: PwdReset = {token: this.token, ...form.value}
      this.store.dispatch(reset({state: pwdReset}))
      this.store.pipe(select(notify)).subscribe(res => {
        if(res.status == 'reset'){this.router.navigate(['/login'])}
      })
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.token = params.get('token') || ''})
  }

}
