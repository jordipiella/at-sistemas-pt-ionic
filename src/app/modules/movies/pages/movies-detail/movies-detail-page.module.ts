import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MoviesDetailPage } from './movies-detail.page';
import { MoviesDetailPageRoutingModule } from './movies-detail-page-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from '../../../../shared/utils/http-loader.factory';
import { CoreModule } from '../../../../core/core.module';
import { MoviesDetailViewComponent } from './components/movies-detail-view/movies-detail-view.component';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms/custom-forms.module';
import { FormsModule } from '@angular/forms';
import { MinToHPipe } from '../../../../shared/pipes/secToMin.pipe';


@NgModule({
  declarations: [
    MoviesDetailPage,
    MoviesDetailViewComponent,
    MinToHPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    MoviesDetailPageRoutingModule,
    CoreModule,
    FormsModule,
    CustomFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class MoviesDetailPageModule { }
