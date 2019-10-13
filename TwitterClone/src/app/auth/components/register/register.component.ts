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
  email = new FormControl('', [Validators.required, Validators.email]);
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


  get emailControl(): AbstractControl {
    return this.registerForm.get('email');
  }

  get usernameControl(): AbstractControl {
    return this.registerForm.get('username');
  }
  
  get passwordControl(): AbstractControl {
    return this.registerForm.get('password');
  }

  get imageControl(): AbstractControl {
    return this.registerForm.get('image');
  }

  onSubmit() {
    const credentials = this.registerForm.value;
    console.log(this.imageControl.value);
    if(this.imageControl.value === ''){
      credentials.image = 'assets/icons/default-profile-picture.jpg';
    }
    credentials.createdAt = new Date().toLocaleDateString();
    credentials.lastLogin = new Date().toLocaleDateString();
    this.authService.attemptAuth('register', credentials).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      err => {
        this.errors = err;
      }
    );  
  }
}
