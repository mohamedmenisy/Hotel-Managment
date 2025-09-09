import { DashLoaderService } from './../../shared/Services/dash-loader.service';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Constants } from '../Enviroment/Constants';
import { finalize } from 'rxjs';

export const dashboardLoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const dashLoader = inject(DashLoaderService);

  if (req.url.includes('/dashboard')) {
    dashLoader.show();

    const isAbsolute = /^https?:\/\//i.test(req.url);
    const url = isAbsolute ? req.url : Constants.baseUrl + req.url;
    const token = localStorage.getItem('token');

    const updated = req.clone({
      url: url,
      setHeaders: token ? { Authorization: `${token}` } : {},
    });

    return next(updated).pipe(
      finalize(() => dashLoader.hide())
    );
  }

  return next(req);
};
