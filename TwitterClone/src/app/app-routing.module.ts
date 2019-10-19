import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', loadChildren: () => import('src/app/shared/shared.module').then(m => m.SharedModule)},
  { path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)},
  { path: 'profile', loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
