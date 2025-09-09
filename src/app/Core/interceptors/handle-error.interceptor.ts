import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,  
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Something went wrong, please try again later.';
        if (error.status === 0) {
          errorMessage = 'Cannot connect to the server. Please check your connection.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = error.message;
        }
        this._snackBar.open(errorMessage, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        return throwError(() => error);
      })

    );

  }
}
