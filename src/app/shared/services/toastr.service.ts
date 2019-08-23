import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {

    private _messages: BehaviorSubject<Toast>;

    constructor() {
        this._messages = new BehaviorSubject<Toast>(undefined);
    }

    public pushMessage(message: string, type?: string): void {
        this._messages.next(new Toast(message, type));
    }

    public get messageQueue(): Observable<Toast> {
        return this._messages.asObservable();
    }
}

export class Toast {
    message: string;
    type: string;

    constructor(m: string, t: string) {
        this.message = m;
        this.type = t;
    }
}