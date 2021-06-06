import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MoviesEditPage } from './movies-edit.page';
import { MoviesEditPageRoutingModule } from './movies-edit-page-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from '../../../../shared/utils/http-loader.factory';
import { CoreModule } from '../../../../core/core.module';
import { MoviesEditFormComponent } from './components/movies-edit-form/movies-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms/custom-forms.module';


@NgModule({
  declarations: [
    MoviesEditPage,
    MoviesEditFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MoviesEditPageRoutingModule,
    CoreModule,
    ReactiveFormsModule,
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
export class MoviesEditPageModule { }
