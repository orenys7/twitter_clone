import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
      FormsModule,
      SharedModule,
      ReactiveFormsModule,
      AuthRoutingModule,
      HttpClientModule,
      CommonModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
  })
  export class AuthModule { }