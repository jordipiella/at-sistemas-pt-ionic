import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppFacade } from '../services/app.facade';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private appFacade: AppFacade
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.error(error);
        this.appFacade.errorToast(error.message);
        return throwError(error.message);
      })
    )
  }
}
