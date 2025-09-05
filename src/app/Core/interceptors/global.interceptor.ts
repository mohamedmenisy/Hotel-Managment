import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  
  const baseUrl: string = 'https://154.41.228.234:3000/api/v0/portal/';

  const updated = req.clone({
    url: baseUrl + req.url,
  });
   console.log('Request URL:', updated.url);
  return next(updated);
};
