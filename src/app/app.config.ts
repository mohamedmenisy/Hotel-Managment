import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalInterceptor } from './Core/interceptors/global.interceptor';
import { loaderInterceptor } from './Core/interceptors/loader.interceptor';
import {provideTranslateService} from "@ngx-translate/core";
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([globalInterceptor,loaderInterceptor])
    ),
     provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',  // مكان ملفات الترجمة
        suffix: '.json'            // الامتداد
      }),
      lang: 'en',                  // اللغة الافتراضية
      fallbackLang: 'en'           // اللغة البديلة
    })
  ]
};
