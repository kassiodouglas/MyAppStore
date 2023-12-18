import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
    ])
])



export const fadeOut = trigger('fadeOut', [
    transition(':enter', [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0 }))
    ])
])