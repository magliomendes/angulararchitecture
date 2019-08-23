import { ApiTokenService } from '@shared/services/api-token.service';
import { AuthService } from '@shared/services/auth.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

export function init_app(apiTokenService: ApiTokenService, authService: AuthService): Function {
    return (): Promise<any> => {
        return authService.refreshToken()
            .then((e) => {
                // refresh access token
                return authService.refreshToken();
            })
            .catch((error: HttpErrorResponse) => {
                console.error('[app.module.ts]', 'Failed getting API token: ', error);
                init_app(apiTokenService, authService);
            });
    };
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        ApiTokenService,
        AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [ApiTokenService, AuthService],
            multi: true
        }
    ]
})

export class AppInitializeModule { }