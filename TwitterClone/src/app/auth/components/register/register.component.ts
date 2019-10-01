import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

class Model {
  email = '';
  username = '';
  password = '';
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new Model();
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[A-Z]+')]]
    });
  }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  get emailControl(): AbstractControl {
    return this.registerForm.get('email');
  }

  get usernameControl(): AbstractControl {
    return this.registerForm.get('username');
  }
  
  get passwordControl(): AbstractControl {
    return this.registerForm.get('password');
  }

  onSubmit() {
    this.registerForm.reset();
  }
}
