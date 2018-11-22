import { SettingComponent } from './setting/setting.component';
import { RouteGuard } from './routeguard';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: OverviewComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
