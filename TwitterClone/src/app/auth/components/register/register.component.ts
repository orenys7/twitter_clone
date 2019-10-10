import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services';
import { Router } from '@angular/router';

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
  errors: {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[A-Z]+')]],
      image: [''],
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
    console.log(this.registerForm.value);
    const credentials = this.registerForm.value;
    this.authService.attemptAuth('register', credentials).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      err => {
        this.errors = err;
      }
    );  }
}
