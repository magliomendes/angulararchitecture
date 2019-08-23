import { ApiTokenService } from './../services/api-token.service';
import { BaseHttpClient } from './base-http-client.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';

@Injectable()
export class PublicHttpClient extends BaseService implements BaseHttpClient {

    constructor(protected http: HttpClient, private apiTokenService: ApiTokenService) { 
        super(http);
    }

    get(url: string, params?: object, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getAuthorizationHeader());
        return super.get(url, params, options);
    }

    post(url: string, body: any, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getAuthorizationHeader());
        return super.post(url, body, options);
    }

    put(url: string, param: any, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getAuthorizationHeader());
        return super.put(url, param, options);
    }

    patch(url: string, param: any, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getAuthorizationHeader());
        return super.patch(url, param, options);
    }

    private getAuthorizationHeader(): Object {
        const apiToken = this.apiTokenService.apiToken;

        if (apiToken) {
            const token = apiToken.access_token;
            return { 'Authorization': `Bearer ${token}` };
        }

        return null;
    }
}
