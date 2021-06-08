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
import * as fromMovies from './state/movies.reducer';
import { StoreModule } from '@ngrx/store';
import { MoviesEffects } from './state/movies.effects';
import { EffectsModule, USER_PROVIDED_EFFECTS } from '@ngrx/effects';


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
    StoreModule.forFeature(fromMovies.moviesFeatureKey, fromMovies.reducer),
    EffectsModule.forFeature([MoviesEffects]),

  ],
  providers: [
    MoviesEffects,
  {
    provide: USER_PROVIDED_EFFECTS,
    multi: true,
    useValue: [MoviesEffects],
  },
  ]
})
export class MoviesModule { }
