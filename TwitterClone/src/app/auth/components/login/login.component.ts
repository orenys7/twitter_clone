import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

class Model {
  email = '';
  password = '';
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  model = new Model();
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[A-Z]+')]]
    });
  }

  ngOnInit() {
  }
  
  email = new FormControl('', [Validators.required, Validators.email]);

  get emailControl(): AbstractControl {
    return this.loginForm.get('email');
   }

   get passwordControl(): AbstractControl {
     return this.loginForm.get('password');
   }

   onSubmit(){
    this.loginForm.reset();
  }
}
