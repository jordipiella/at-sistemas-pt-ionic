import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ApiModule } from '@api';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from 'src/app/shared/utils/http-loader.factory';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SwitchLanguageComponent } from './switch-language/switch-language.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SwitchLanguageComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
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
  exports: [
    HeaderComponent,
    LoadingComponent
  ]
})
export class CoreModule { }
