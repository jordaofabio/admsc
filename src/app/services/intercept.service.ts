import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {

  constructor(private router: Router) {}

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // modify request
      request = request.clone({
        setHeaders: {
          'x-access-token': `${sessionStorage.getItem('scToken')}`
        }
      });

      console.log('----request----');
      console.log(request);
      console.log('--- end of request---');

      return next.handle(request).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              // console.log(' all looks good');
              // // http response status code
              // console.log(event.status);
            }
          },
          error => {
            // http response status code
            /* console.log('----response----');
            console.error('status code:');
            console.error(error.status);
            console.error(error.message);
            console.log('--- end of response---'); */
            sessionStorage.removeItem('scToken');
            this.router.navigate(['login']);
          }
        )
      );
  }
}
