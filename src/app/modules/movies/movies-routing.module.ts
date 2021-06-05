import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/movies-page.module').then( m => m.MoviesPageModule)
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
