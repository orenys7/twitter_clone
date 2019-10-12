import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services';
import { LoginResp } from 'src/app/core/models';

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
  errors = { errors: {} };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
  ) {
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

  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.attemptAuth('login', credentials).subscribe(
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
