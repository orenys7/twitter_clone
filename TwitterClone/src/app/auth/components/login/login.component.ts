import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services';
import { LoginResp } from 'src/app/core/models';
import { Subscription } from 'rxjs';

class Model {
  email = '';
  password = '';
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription [] = [];
  model = new Model();
  loginForm: FormGroup;
  errors = { };
  errorStatus: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*')]]
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
    this.subscriptions.push(this.authService.attemptAuth('login', credentials).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      error => {
        this.errors = error;
        this.errorStatus = error.status;
      }
    ));
  }

  hasError(controlName: string){
    const control = this.loginForm.controls[controlName];
    return (control.errors && (control.dirty || control.touched))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
