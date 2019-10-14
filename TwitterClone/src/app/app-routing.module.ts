import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component'

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', loadChildren: () => import('src/app/shared/shared.module').then(m => m.SharedModule)},
  { path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)},
  { path: 'profile', loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfileModule)},
  // { path: 'register', children: authRoutes },
  // { path: 'user/:id', children: userRoutes },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
