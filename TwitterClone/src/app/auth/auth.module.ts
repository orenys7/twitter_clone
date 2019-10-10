import { NgModule } from '@angular/core';
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
      HttpClientModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
  })
  export class AuthModule { }