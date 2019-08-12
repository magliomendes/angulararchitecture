import { animate, style, group, query } from '@angular/animations';

export const fadeInOut = [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' })
        , { optional: true }),
    group([
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(1.5rem)' }),
            animate('0.5s 0.75s ease-in', style({ opacity: 1.0, transform: 'translateY(0rem)' }))
        ], { optional: true }),
        query(':leave', [
            style({ opacity: 1.0 }),
            animate('0.250s ease-out', style({ opacity: 0, transform: 'translateY(1.5rem)' }))
        ], { optional: true })
    ])
];