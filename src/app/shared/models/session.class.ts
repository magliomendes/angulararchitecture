export class SessionSchema {
    accessToken?: string;
    expirationDate?: string;
    tokenType?: string;

    constructor(args: SessionSchema = {}) {
        if (args) {
            this.accessToken = args.accessToken;
            this.expirationDate = args.expirationDate;
            this.tokenType = args.tokenType;
        }
    }
}

export class Session extends SessionSchema {
    getAccessToken(): string {
        return this.accessToken;
    }

    getExpirationDate(): string {
        return this.expirationDate;
    }

    isExpired(date: Date): boolean {
        if (this.expirationDate) {
            return date > new Date(this.expirationDate);
        }
        return true;
    }

    isValid(): boolean {
        if (this.accessToken && this.expirationDate) {
            return true;
        } else {
            return false;
        }
    }
}