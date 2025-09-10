import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Constants } from '../Enviroment/Constants';
import { finalize } from 'rxjs';
import { AuthLoaderService } from '../../shared/Services/auth-loader.service';
import { DashLoaderService } from '../../shared/Services/dash-loader.service';

let authRequests = 0;
let dashRequests = 0;

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const authLoader = inject(AuthLoaderService);
  const dashLoader = inject(DashLoaderService);

  const isAuthRequest = req.url.includes('/auth');
  const isDashboardRequest = req.url.includes('/dashboard');

  let updated = req;
  const isAbsolute = /^https?:\/\//i.test(req.url);
  const url = isAbsolute ? req.url : Constants.baseUrl + req.url;
  const token = localStorage.getItem('token');

  if (token) {
    updated = req.clone({
      url,
      setHeaders: { Authorization: `${token}` },
    });
  } else {
    updated = req.clone({ url });
  }

  if (isAuthRequest) {
    authRequests++;
    authLoader.show();

    return next(updated).pipe(
      finalize(() => {
        authRequests--;
        if (authRequests === 0) {
          authLoader.hide();
        }
      })
    );
  }

  if (isDashboardRequest) {
    dashRequests++;
    dashLoader.show();

    return next(updated).pipe(
      finalize(() => {
        dashRequests--;
        if (dashRequests === 0) {
          dashLoader.hide();
        }
      })
    );
  }

  return next(updated);
};
