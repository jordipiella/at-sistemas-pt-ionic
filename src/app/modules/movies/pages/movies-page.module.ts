import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MoviesPage } from './movies.page';
import { MoviesPageRoutingModule } from './movies-page-routing.module';
import { CoreModule } from '../../../core/core.module';
import { CardModule } from 'src/app/shared/modules/card/card.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from '../../../shared/utils/http-loader.factory';


@NgModule({
  declarations: [
    MoviesPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    MoviesPageRoutingModule,
    CoreModule,
    CardModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class MoviesPageModule { }
