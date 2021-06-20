import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'
import {UserService as US} from "../user/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msg: string = ''
  public loggedin: boolean = false
  loginForm: FormGroup
  constructor(private us: US, private fg: FormBuilder, private router: Router) {
    this.loginForm = fg.group({
      email: [''],
      password: [''],
    })
  }

  login(form: FormGroup){
    if(form.valid){
      this.us.login(form.value).subscribe(
        (value => {
          this.loggedin = value.status
          this.msg = value.msg
          this.router.navigate(['/home'])
        }),
        (error => {
          this.msg = 'Unable to login try again'
          this.loggedin = false
          console.log(error)
        })
      )
    }
  }
  ngOnInit(): void {
  }

}
