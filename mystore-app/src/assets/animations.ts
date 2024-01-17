import {trigger, animate, style, group, animateChild, query, stagger, transition, keyframes} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
    ])
])


export const fadeAnimation = trigger('fadeAnimation', [

    transition('* => *', [

        query(':enter', [style({ opacity: 0 })], { optional: true }),

        query(':leave',[style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],{ optional: true }),

        query(':enter',[style({ opacity: 0}), animate('0.3s', style({ opacity: 1 }))],{ optional: true }),

    ]),

  ]);