import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesEditPage } from './movies-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesEditPageRoutingModule { }
