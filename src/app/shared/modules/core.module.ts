import { UAAHttpclient } from './../http/uaa-http-client.class';
import { ApiTokenService } from '@app/shared/services/api-token.service';
import { TokenInterceptor } from '../http/token.interceptor';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { SessionGuard } from '@app/shared/guards/session.guard';
import { PublicHttpClient } from '@app/shared/http/public-http-client.class';
import { LocalStorage } from '@app/shared/persistence/local-storage';
import { StorageService } from '@shared/services/storage.service';
import { AuthService } from './../services/auth.service';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        LocalStorage,
        PublicHttpClient,
        SessionGuard,
        StorageService,
        TokenInterceptor,
        UAAHttpclient,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})

export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}
