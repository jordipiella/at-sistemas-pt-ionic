import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { IonicModule } from '@ionic/angular';
import { ApiModule } from '@api';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from 'src/app/shared/utils/http-loader.factory';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
import { CardModule } from 'src/app/shared/modules/card/card.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    IonicModule,
    ApiModule,
    CoreModule,
    CardModule,
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
