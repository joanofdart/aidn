import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #apiKey: string;

  constructor() {
    this.#apiKey = environment.apiKey;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone();
    req.headers.append('x-api-key', this.#apiKey);
    req.headers.append('content-type', 'application/json');

    return next.handle(req);
  }
}
