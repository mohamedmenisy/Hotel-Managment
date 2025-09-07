import { HttpInterceptorFn } from '@angular/common/http';
import { Constants } from '../Enviroment/Constants';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const isAbsolute = /^https?:\/\//i.test(req.url);
  const url = isAbsolute ? req.url : Constants.baseUrl + req.url;
  const token = localStorage.getItem('token');

  const updated = req.clone({
     url:url,
    setHeaders: token ? { Authorization: `${token}` } : {},
    });
  return next(updated);
};
