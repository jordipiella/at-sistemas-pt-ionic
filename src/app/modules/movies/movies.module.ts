import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { IonicModule } from '@ionic/angular';
import { MoviesPage } from './pages/movies.page';
import { ApiModule } from '@api';


@NgModule({
  declarations: [
    MoviesPage
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    IonicModule,
    ApiModule
  ],
  providers: [
  ]
})
export class MoviesModule { }
