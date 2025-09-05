import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
  RouterOutlet,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as animation from './animations/animations';
import { LoaderService } from './loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    animations: [animation.fadeSlideInOut()],
    standalone: false
})
export class AppComponent implements OnDestroy {
  leaving = false;
  routesVisible = true;
  animationState$ = new BehaviorSubject<string>('fadeInOut');
  circlePositionY: string = window.innerWidth < 768 ? '100%' : '150%';

  private readonly LEAVE_ANIMATION_DURATION = 300;
  private readonly LOADER_DURATION = 1000;
  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    public loader: LoaderService,
  ) {
    this.initializeRouterEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeRouterEvents(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          this.handleNavigationStart();
        }

        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.handleNavigationEnd();
        }
      });
  }

  private handleNavigationStart(): void {
    // Immédiatement masquer les routes et activer leaving
    this.routesVisible = false;
    this.leaving = true;

    // Forcer la détection des changements pour que la condition *ngIf s'applique immédiatement
    this.cdr.detectChanges();
  }

  private handleNavigationEnd(): void {
    // Attendre la fin de l'animation leave (si elle existe) puis afficher le loader
    setTimeout(() => {
      this.loader.show();

      this.showNewRoute();
    }, this.LEAVE_ANIMATION_DURATION);
  }

  private showNewRoute(): void {
    // Masquer le loader et réinitialiser l'état après le délai souhaité
    setTimeout(() => {
      this.loader.hide();
      this.leaving = false;
      this.routesVisible = true;
      this.animationState$.next(this.getAnimationName());
      this.cdr.detectChanges();
    }, this.LOADER_DURATION);
  }

  private getAnimationName(): string {
    return (
      this.router.routerState.root.firstChild?.snapshot.data?.['animation'] ||
      'fadeInOut'
    );
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['animation'] || 'fadeSlideInOut';
  }
}
