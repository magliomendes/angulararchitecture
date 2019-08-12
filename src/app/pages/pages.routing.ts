import { AnimalsComponent } from './animals/animals.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '**', redirectTo: 'animals' },
      { path: 'animals', component: AnimalsComponent, data: { state: 'animals' } },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
