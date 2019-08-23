export interface IStorage {
    save(key: string, value: any): void;
    get(key: string): any;
    delete(key: string): void;
}