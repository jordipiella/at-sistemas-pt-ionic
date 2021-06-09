import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsAddBadgeComponent } from './components/forms-add-badge/forms-add-badge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from './components/badge/badge.component';
import { FormsMultiSelectBadgeComponent } from './components/forms-multiselect-badge/forms-multiselect-badge.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from '../../utils/http-loader.factory';
import { FormErrorComponent } from './components/forms-error/form-error.component';


@NgModule({
  declarations: [
    BadgeComponent,
    FormsAddBadgeComponent,
    FormsMultiSelectBadgeComponent,
    FormErrorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    BadgeComponent,
    FormsAddBadgeComponent,
    FormsMultiSelectBadgeComponent,
    FormErrorComponent
  ]
})
export class CustomFormsModule { }
