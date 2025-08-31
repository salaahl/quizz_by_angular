import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as animation from './animations/animations';
import * as questionBank from './questions/questionBank/questions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [animation.fadeSlideInOut(), animation.fadeIn()],
})
export class AppComponent {
  circlePositionY: any = window.innerWidth < 768 ? '100%' : '150%';

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || 'any';
  }
}
