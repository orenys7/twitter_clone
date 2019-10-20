import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  model = new Model();
  registerForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  errors: {};
  errorStatus: number;
  checked: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*')]],
      image: ['',],
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
    if(this.imageControl.value === ''){
      credentials.image = 'assets/icons/default-profile-picture.jpg';
    }
    this.subscriptions.push(this.authService.attemptAuth('register', credentials).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
        this.errors = error;
        this.errorStatus = error.status;
      }
    ));  
  }

  hasError(controlName: string){
    const control = this.registerForm.controls[controlName];
    return (control.errors && (control.dirty || control.touched))
  }
    
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
