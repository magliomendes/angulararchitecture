import { AuthService } from '../services/auth.service';
import { ApiTokenService } from './../services/api-token.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastService } from '../services';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private _toastService: ToastService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                }, (errorResponse: any) => {
                    if (errorResponse.status === 500) {
                        this.handleServerFailure(errorResponse);
                    }
                    else if ((errorResponse.status === 401)) {
                        this.handleUnauthorized(errorResponse);
                    }
                    else if ((errorResponse.status === 400)) {
                        this.handleServerFailure(errorResponse, "invalid request");
                    }
                }
            )
        )
    }

    private handleUnauthorized(errorResponse: HttpErrorResponse): void {
        if (errorResponse.error['error'] === 'invalid_token') {
            const tokenService = this.injector.get(ApiTokenService);
            tokenService.getNewAccessToken();
        }

        const router = this.injector.get(Router);
        const authService = this.injector.get(AuthService);
        authService.logout()
            .catch().then(() => {
                router.navigate(['/']);
            });
    }

    private handleServerFailure(errorResponse: HttpErrorResponse, message: string = "Error"): void {
        this._toastService.pushMessage(message, "danger")
    }
}