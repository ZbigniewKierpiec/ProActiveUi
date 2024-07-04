import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // private activeTheme: 'light' | 'dark' = 'light';

  // constructor() {
  //   this.loadTheme();
  //   this.updateTheme();
  //   this.addSystemThemeListener();
  // }

  // private loadTheme(): void {
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme) {
  //     this.activeTheme = savedTheme as 'light' | 'dark';
  //   } else {
  //     // If no saved theme, check system preference
  //     this.activeTheme = window.matchMedia('(prefers-color-scheme: dark)')
  //       .matches
  //       ? 'dark'
  //       : 'light';
  //   }
  // }

  // toggleTheme(): void {
  //   this.activeTheme = this.activeTheme === 'light' ? 'dark' : 'light';
  //   this.saveTheme();
  //   this.updateTheme();
  //   console.log(this.activeTheme);
  // }

  // private saveTheme(): void {
  //   localStorage.setItem('theme', this.activeTheme);
  // }

  // private updateTheme(): void {
  //   document.body.classList.remove('light-theme', 'dark-theme');
  //   document.body.classList.add(`${this.activeTheme}-theme`);
  // }

  // private addSystemThemeListener(): void {
  //   window
  //     .matchMedia('(prefers-color-scheme: dark)')
  //     .addEventListener('change', (e) => {
  //       this.activeTheme = e.matches ? 'dark' : 'light';
  //       this.saveTheme();
  //       this.updateTheme();
  //     });
  // }

  // getCurrentTheme(): 'light' | 'dark' {
  //   return this.activeTheme;
  // }

  private darkThemeClass = 'dark-theme';
  private localStorageKey = 'theme-preference';
  private themeSubject: BehaviorSubject<'light' | 'dark'>;

  constructor() {
    const savedTheme = localStorage.getItem(this.localStorageKey) as 'light' | 'dark';
    const initialTheme = savedTheme ? savedTheme : 'light';
    this.themeSubject = new BehaviorSubject<'light' | 'dark'>(initialTheme);
    this.setTheme(initialTheme);  // Ensure the initial theme is applied
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: 'dark' | 'light'): void {
    if (theme === 'dark') {
      document.body.classList.add(this.darkThemeClass);
    } else {
      document.body.classList.remove(this.darkThemeClass);
    }
    localStorage.setItem(this.localStorageKey, theme);
    this.themeSubject.next(theme);
  }

  getCurrentTheme(): Observable<'light' | 'dark'> {
    return this.themeSubject.asObservable();
  }


}
