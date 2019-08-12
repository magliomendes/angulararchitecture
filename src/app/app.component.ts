import { Component } from '@angular/core';
import { trigger, transition } from '@angular/animations';
import { fadeInOut } from '@shared/animations';

const routerTransition = trigger('routerTransition', [
  transition('* <=> *', fadeInOut),
]);

@Component({
  selector: 'app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  getState(outlet): void {
    return outlet.activatedRouteData.state;
  }
}
