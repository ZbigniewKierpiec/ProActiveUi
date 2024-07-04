import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly LANG_KEY = 'app-lang'; // Key for storing language in local storage

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem(this.LANG_KEY);
    const defaultLang = savedLang || 'eng';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem(this.LANG_KEY, language);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
