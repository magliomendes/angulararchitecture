import { AuthGuard } from '@shared/guards/auth.guard';
import { SessionGuard } from '@shared/guards/session.guard';
import { AnimalsComponent } from './animals/animals.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'animals', component: AnimalsComponent, data: { state: 'animals' }, canActivate: [AuthGuard] },
      { path: '', component: LoginComponent, data: { state: 'login' }, canActivate: [SessionGuard] },
      { path: '**', redirectTo: '' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
