import { AnimalsItemComponent } from './list-itens/list-itens.component';
import { AnimalsListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsComponent } from './animals.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
      AnimalsComponent,
      AnimalsListComponent,
      AnimalsItemComponent
  ],
  providers: []
})
export class AnimalsModule { }
