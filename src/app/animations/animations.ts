import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

let milliseconds = 300;

export function fadeIn(duration: number = milliseconds) {
  return trigger('fadeIn', [
    // quand le composant entre
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration}ms ease-in-out`, style({ opacity: 1 })),
    ]),
    // quand le composant sort
    transition(':leave', [
      animate(`${duration}ms ease-in-out`, style({ opacity: 0 })),
    ]),
  ]);
}

export function fadeSlideInOut(duration: number = milliseconds) {
  return trigger('fadeSlideInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(50px)' }),
      animate(
        `${duration}ms ease-in-out`,
        style({ opacity: 1, transform: 'translateY(0)' }),
      ),
      query('*', [
        animate(
          `${duration}ms ease-in-out`,
          style({
            opacity: 1,
          }),
        ),
      ]),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0)' }),
      animate(
        `${duration}ms ease-in-out`,
        style({ opacity: 0, transform: 'translateY(50px)' }),
      ),
      query('*', [
        animate(
          `${duration}ms ease-in-out`,
          style({
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ]);
}
