import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { IonicModule } from '@ionic/angular';
import { MoviesPage } from './pages/movies.page';
import { ApiModule } from '@api';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from 'src/app/shared/utils/http-loader.factory';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    MoviesPage
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    IonicModule,
    ApiModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
  ]
})
export class MoviesModule { }
