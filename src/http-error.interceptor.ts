import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoadingService } from './app/services/loading.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    return next.handle(req).pipe(
      // Handle the response
      tap(evt => {
        if (evt instanceof HttpResponse) {
          // You can perform some action on the response here if needed
        }
      }),
      // Handle errors
      catchError((error: HttpErrorResponse) => {
        console.error('Error from error interceptor', error);
        // this.snackBar.open(error.message, 'Error', {
        //   duration: 3000,
        // });
        return throwError(error);
      }),
      // Finalize the request
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
