import { Injectable } from '@angular/core';
import { LANG, LANG_EN } from './constants/lang.constants';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translate: TranslateService
  ) { }

  setDefaultLanguage(): void {
    let localLanguage: string = localStorage.getItem(LANG);
    localLanguage = localLanguage ? localLanguage : LANG_EN;
    this.setLanguage(localLanguage);
  }

  setLanguage(lang: string): void {
    localStorage.setItem(LANG, lang);
    this.translate.use(lang);
  }


}
