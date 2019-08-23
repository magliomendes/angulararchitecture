import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';
import { Pages } from '@shared/helpers/routes.helper';

@Injectable()
export class SessionGuard implements CanActivate {

    constructor(private auth: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isLoggedIn()) {
            return this.router.navigate([Pages.HOME]) && false;
        }
        return true;
    }
}