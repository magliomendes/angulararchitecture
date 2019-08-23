import { LocalStorage } from './../persistence/local-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor(private _storage: LocalStorage) { }

    get storage() {
        return this._storage;
    }
}