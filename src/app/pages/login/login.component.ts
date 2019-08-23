import { Pages } from '@shared/helpers/routes.helper';
import { Router } from '@angular/router';
import { Credential } from '@shared/models/credential.class';
import { AuthService } from '@shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    public login(credential: Credential): Promise<number> {
        
        return this.authService.login(credential)
            .then(() => {
                this.router.navigate([Pages.HOME]);
                return 0;
            })
            .catch((error: number) => {
                return 1;
            })
            .then((error: number) => {
                return Promise.resolve(1);
            });
    }

}
