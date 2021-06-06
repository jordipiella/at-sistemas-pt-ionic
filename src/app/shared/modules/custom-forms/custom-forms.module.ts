import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsAddBadgeComponent } from './components/forms-add-badge/forms-add-badge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from './badge/badge.component';


@NgModule({
  declarations: [
    BadgeComponent,
    FormsAddBadgeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    BadgeComponent,
    FormsAddBadgeComponent
  ]
})
export class CustomFormsModule { }
