import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'
import {UserService as US} from "./services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  msg: string = '';
  public created: boolean = false;
  userReg: FormGroup;
  constructor(private fb: FormBuilder, private us: US, private router: Router) {
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    this.userReg = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      let val = form.value;
      this.us.createUser(val).subscribe((value => {
        this.msg = value.msg
        this.created = value.status
      }),
        error => {
        this.msg = "An Error Occurred Try Again"
        this.created = false
        },
        () => {
          this.router.navigate(['/home'])
        })
    }

  }

  ngOnInit(): void {
  }


}
