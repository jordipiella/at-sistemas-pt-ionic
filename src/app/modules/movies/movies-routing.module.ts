import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/movies/movies-page.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/movies-edit/movies-edit-page.module').then( m => m.MoviesEditPageModule)
  },
  {
    path: 'edit/:movieId',
    loadChildren: () => import('./pages/movies-edit/movies-edit-page.module').then( m => m.MoviesEditPageModule)
  },
  {
    path: ':movieId',
    loadChildren: () => import('./pages/movies-detail/movies-detail-page.module').then( m => m.MoviesDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
