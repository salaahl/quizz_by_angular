import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
} from '@angular/animations';

let milliseconds = 300;
let tEmphasis =
  'linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%)';

export function rotateY(duration: number = milliseconds) {
  return trigger('rotateY', [
    transition('* <=> *', [
      style({ transform: 'rotateY(0deg)', filter: 'opacity(1)' }),
      group([
        animate(`350ms ${tEmphasis}`, style({ transform: 'rotateY(720deg)' })),
        animate(`200ms 150ms ${tEmphasis}`, style({ filter: 'opacity(0)' })),
      ]),
      group([
        animate(`700ms ${tEmphasis}`, style({ transform: 'rotateY(0deg)' })),
        animate(`350ms ${tEmphasis}`, style({ filter: 'opacity(1)' })),
      ]),
    ]),
  ]);
}

export function fadeSlideInOut(duration: number = milliseconds) {
  return trigger('fadeSlideInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(50px)' }),
      animate(
        `${duration}ms ease-in-out`,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      query('*', [
        animate(
          `${duration}ms ease-in-out`,
          style({
            opacity: 1,
          })
        ),
      ]),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0)' }),
      animate(
        `${duration}ms ease-in-out`,
        style({ opacity: 0, transform: 'translateY(50px)' })
      ),
      query('*', [
        animate(
          `${duration}ms ease-in-out`,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ]);
}
