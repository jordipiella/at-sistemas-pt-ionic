import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from './language/language.service';
import { LoadingService } from './loading/loading.service';
import { ToastService } from './toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private toastService: ToastService
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

  errorToast(message: string): void {
    this.toastService.errorToast(message);
  }

  successToast(message: string): void {
    this.toastService.successToast(message);
  }

}
