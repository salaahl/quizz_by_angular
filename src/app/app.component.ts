import { ChangeDetectorRef, Component } from '@angular/core';
import {
  RouterOutlet,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as animation from './animations/animations';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [animation.fadeSlideInOut()],
})
export class AppComponent {
  leaving = false;
  routesVisible = true;
  animationState$ = new BehaviorSubject<string>('fadeInOut');
  circlePositionY: any = window.innerWidth < 768 ? '100%' : '150%';

  leaveAnimationDuration = 300;
  loaderDuration = 1000;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    public loader: LoaderService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Lancer la transition leave
        this.leaving = true;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Attendre que l'animation leave soit terminée avant d'afficher le loader
        setTimeout(() => {
          this.leaving = false;
          this.routesVisible = false; // cacher l'ancienne route
          this.loader.show();

          // Puis cacher le loader après un délai et afficher la nouvelle route
          setTimeout(() => {
            this.loader.hide();
            this.routesVisible = true;
            const animationName =
              this.router.routerState.root.firstChild?.snapshot.data[
                'animation'
              ] || 'fadeInOut';
            this.animationState$.next(animationName);
            this.cdr.detectChanges();
          }, this.loaderDuration); // loaderDuration = durée minimale souhaitée du loader
        }, this.leaveAnimationDuration); // leaveAnimationDuration = durée de la transition leave
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || 'fadeSlideInOut';
  }
}
