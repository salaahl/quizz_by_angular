import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
  keyframes,
} from '@angular/animations';

let milliseconds = 300;
let tEmphasis =
  'linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%)';

export function animateQuestionCard(duration: number = milliseconds) {
  return trigger('animateQuestionCard', [
    transition('* <=> *', [
      // Permet d'animer les différentes parties de la carte en même temps
      group([
        // Part 1 - card-after
        query(
          '.card-after',
          [
            style({
              height: '100%',
              width: '100%',
              zIndex: 1,
              opacity: 0,
            }),
            animate(`50ms ${tEmphasis}`, style({ opacity: 1 })),
            animate(`650ms 1350ms ${tEmphasis}`, style({ opacity: 0 })),
          ],
          { optional: true }
        ),

        // Part 2 - rotation de la carte et gestion de l'ombre
        style({
          boxShadow: '-18px 20px 0px black',
        }),
        animate(
          `350ms ${tEmphasis}`,
          style({ boxShadow: '0px 0px 0px black' })
        ),
        animate(
          `1000ms ${tEmphasis}`,
          keyframes([
            style({ transform: 'rotate(0deg)', offset: 0 }),
            style({ transform: 'rotate(3deg)', offset: 0.1 }),
            style({ transform: 'rotate(0deg)', offset: 0.2 }),
            style({ transform: 'rotate(-3deg)', offset: 0.3 }),
            style({ transform: 'rotate(0deg)', offset: 0.4 }),
            style({ transform: 'rotate(3deg)', offset: 0.5 }),
            style({ transform: 'rotate(0deg)', offset: 0.6 }),
            style({ transform: 'rotate(-3deg)', offset: 0.7 }),
            style({ transform: 'rotate(0deg)', offset: 0.8 }),
            style({ transform: 'rotate(3deg)', offset: 0.9 }),
            style({ transform: 'rotate(0deg)', offset: 1 }),
          ])
        ),
        animate(
          `500ms 2000ms ${tEmphasis}`,
          style({ boxShadow: '-18px 20px 0px black' })
        ),
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
