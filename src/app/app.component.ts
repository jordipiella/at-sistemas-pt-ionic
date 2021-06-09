import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANG_EN } from './core/services/language/constants/lang.constants';
import { AppFacade } from './core/services/app.facade';
import { MENU } from './core/constants/menu.constants';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = MENU;

  constructor(
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {
    this.appFacade.setDefaultLanguage();
  }
}
