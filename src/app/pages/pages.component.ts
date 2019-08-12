import { Component} from '@angular/core';
import { trigger, transition } from '@angular/animations';
import { fadeInOut } from '../shared/animations';

const routerTransition = trigger('routerTransition', [
  transition('* <=> *', fadeInOut)
]);

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [routerTransition]
})
export class PagesComponent {

  constructor() { }

  getState(outlet): void {
    return outlet.activatedRouteData.state;
  }
}
