import { Injectable } from '@angular/core';
import { LANG, LANG_EN, LANG_ES } from './constants/lang.constants';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class LanguageService {

  private _languages: string[] = [ LANG_EN, LANG_ES ];

  constructor(
    private translate: TranslateService
  ) { }

  setDefaultLanguage(): void {
    let localLanguage: string = localStorage.getItem(LANG);
    localLanguage = (localLanguage) ? localLanguage : LANG_EN;
    this.setLanguage(localLanguage);
  }

  setLanguage(lang: string): void {
    localStorage.setItem(LANG, lang);
    this.translate.use(lang);
  }

  get languages(): string[] {
    return this._languages;
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }


}
