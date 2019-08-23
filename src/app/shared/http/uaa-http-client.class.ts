import { BaseHttpClient } from './base-http-client.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';

@Injectable()
export class UAAHttpclient extends BaseService implements BaseHttpClient {

    constructor(protected http: HttpClient) {
        super(http);
    }

    get(url: string, params?: object, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getBasicHeaders());
        return super.get(url, params, options);
    }

    post(url: string, body: any, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getBasicHeaders());
        return super.post(url, body, options);
    }

    put(url: string, param: any, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getBasicHeaders());
        return super.put(url, param, options);
    }

    patch(url: string, param: any, options?: any): Promise<any> {
        options = this.addHeaders(options, this.getBasicHeaders());
        return super.patch(url, param, options);
    }

    private getBasicHeaders(): Object {
        return {
            'Content-Type': 'application/json'
        };
    }
}
