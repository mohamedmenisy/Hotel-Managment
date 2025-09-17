import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private langSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.langSubject.asObservable();

  constructor(private translate:TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('en');

    const savedLang = localStorage.getItem('lang') || 'en';
    this.setLang(savedLang);
  }

  setLang(lang: string) {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
    this.langSubject.next(lang);
  }

  

}
