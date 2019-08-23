import { IStorage } from "./storage.interface";

export class LocalStorage implements IStorage {
    save(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    delete(key: string): void {
        localStorage.removeItem(key);
    }
}