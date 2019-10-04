import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
      FormsModule,
      SharedModule,
      ReactiveFormsModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
  })
  export class AuthModule { }