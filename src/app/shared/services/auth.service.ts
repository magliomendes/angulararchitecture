import { ApiToken } from './../models/api-token.interface';
import { ApiTokenService } from '@app/shared/services/api-token.service';
import { Credential } from './../models/credential.class';
import { IStorage } from './../persistence/storage.interface';
import {
    HttpErrorResponse
} from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/session.class';
import { PublicHttpClient } from '../http/public-http-client.class';
import { StorageService } from './storage.service';
import Keys from '../persistence/storage-keys';

@Injectable()
export class AuthService {

    private storage: IStorage;
    private _session$: BehaviorSubject<Session> = new BehaviorSubject(
        new Session()
    );

    constructor(
        private publicHttpClient: PublicHttpClient,
        storageService: StorageService,
        private apiTokenService: ApiTokenService
    ) {
        this.storage = storageService.storage;

        const storedSession = this.storage.get(Keys.SESSION_DATA);
        if (storedSession) {
            this._session$.next(new Session(storedSession));
        }
    }

    public get session(): Observable<Session> {
        return this._session$.asObservable();
    }

    public get currentSession(): Session {
        return new Session(this._session$.getValue());
    }

    private storeSessionData(res: any): void {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const sessionData = new Session({
            accessToken: res.access_token,
            expirationDate: date.toString(),
            tokenType: res.token_type
        });

        this.storage.save(Keys.SESSION_DATA, sessionData);
        this._session$.next(sessionData);
    }

    public login(credential: Credential): Promise<Session | number> {
        // const body = new URLSearchParams();
        // body.set("grant_type", "password");
        // body.set("username", "credential.email");
        // body.set("password", "credential.password");

        // const options = {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     }
        // };
        
        return this.apiTokenService.getNewAccessToken()
            .then((res: ApiToken) => {
                this.storeSessionData(res);
                return this.currentSession;
            })
            .catch((errorResponse: HttpErrorResponse) => {
                return Promise.reject(errorResponse);
            });
    }

    public logout(): Promise<Boolean> {
        return this.publicHttpClient
            .get("LOGOUT - Route", undefined, { responseType: "text" })
            .then(() => Promise.resolve(true))
            .catch((error: HttpErrorResponse) => Promise.resolve(false))
            .then((result: boolean) => {
                this.storage.delete(Keys.SESSION_DATA);
                this._session$.next(null);
                return Promise.resolve(result);
            });
    }

    public isTokenExpired(session: Session): boolean {

        if (session) {
            const expirationDateMillis: number = Date.parse(session.getExpirationDate());
            const now = new Date();
            const diff = now.getMilliseconds() - expirationDateMillis;
            return diff >= (1000 * 60 * 60 * 24);
        }

        return true;
    }

    public refreshToken(): Promise<void | boolean> {
        const sessionData = this._session$.getValue();
        if (this.isTokenExpired(sessionData)) {

            return this.apiTokenService.getNewAccessToken()
                .then(res => this.storeSessionData(res));
        } else {
            return Promise.resolve(false);
        }
    }
    public isLoggedIn() {
        const session = this.currentSession;
        return session && session.isValid() && !session.isExpired(new Date());
    }
}
