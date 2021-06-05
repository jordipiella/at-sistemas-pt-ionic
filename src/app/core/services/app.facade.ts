import { Injectable } from '@angular/core';
import { LanguageService } from './language/language.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(
    private languageService: LanguageService
  ) { }

  setDefaultLanguage(): void {
    return this.languageService.setDefaultLanguage();
  }

}
