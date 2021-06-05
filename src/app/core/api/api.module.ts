import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMoviesService } from './services/api-movies/api-movies.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiMoviesService
  ]
})
export class ApiModule { }
