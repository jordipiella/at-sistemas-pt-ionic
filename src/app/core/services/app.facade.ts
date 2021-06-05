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

  setLanguage(language: string): void {
    return this.languageService.setLanguage(language);
  }

  get languages(): string[] {
    return this.languageService.languages;
  }

  get currentLang(): string {
    return this.languageService.currentLang;
  }

}
