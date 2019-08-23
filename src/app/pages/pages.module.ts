import { CoreModule } from '@shared/modules/core.module';
import { SharedModule } from '@shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { AnimalsModule } from './animals/animals.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    AnimalsModule
  ],
  declarations: [
    PagesComponent,
    LoginComponent
  ],
  providers: []
})
export class PagesModule { }
