import { ToastService } from './../services/toastr.service';
import { Pages } from '@shared/helpers/routes.helper';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastService.pushMessage('Faça o login para continuar', 'danger');
      return this.router.navigate([Pages.LOGIN]) && false
    }
  }

}