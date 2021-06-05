import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from './language/language.service';
import { LoadingService } from './loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(
    private languageService: LanguageService,
    private loadingService: LoadingService
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

  get loading$(): Observable<boolean> {
    return this.loadingService.loading$;
  }

  get loading(): boolean {
    return this.loadingService.loading;
  }

  set loading(value: boolean) {
    this.loadingService.loading = value;
  }

}
