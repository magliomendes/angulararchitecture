import { UAAHttpclient } from './../http/uaa-http-client.class';
import { Injectable } from '@angular/core';
import { ApiToken } from '../models/api-token.interface';

@Injectable()
export class ApiTokenService {

    private _apiToken: ApiToken;

    constructor(public http: UAAHttpclient) { }

    public getNewAccessToken(): Promise<ApiToken> {
        const url = new URL("https://magliomendes.auth0.com/oauth/token");

        return this.http.post(url.toString(), this.getBasicBody())
            .then((apiToken: ApiToken) => {
                this._apiToken = apiToken;
                return Promise.resolve(apiToken);
            })
    }

    public get apiToken(): ApiToken {
        return this._apiToken;
    }


    public getBasicBody(): Object {
        return {
            "grant_type": "client_credentials",
            "client_id": "YzTdDjllvAzbt4D3CuDsplbeVEnyq5if",
            "client_secret": "tjLRaBLhH-58Ec1Zjep_u5bHpdZizeOvQ4DrGZ25AGt8QfrcPKuk6cT4EN0CcwEQ",
            "audience": "https://magliomendes.auth0.com/api/v2/",
        }
    }

}