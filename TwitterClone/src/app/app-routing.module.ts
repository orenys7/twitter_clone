import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component'

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  // { path: 'login', children: authRoutes },
  // { path: 'register', children: authRoutes },
  // { path: 'user/:id', children: userRoutes },
  { path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
