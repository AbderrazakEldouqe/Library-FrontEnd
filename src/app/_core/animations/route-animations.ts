import {
  trigger,
  animate,
  style,
  group,
  animateChild,
  query,
  stagger,
  transition, AnimationQueryMetadata, AnimationGroupMetadata, state, keyframes
} from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideToLeft()),
  transition('* => isRight', slideToRight()),
  transition('isRight => *', slideToLeft()),
  transition('isLeft => *', slideToRight())
]);

function slideToRight(): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
  const optional = {optional: true};
  return [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({position: 'fixed', width: '100%'}),
      {optional: true}
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({transform: 'translateX(100%)'}),
          animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ],
        {optional: true}
      ),
      query(
        ':leave',
        [
          style({transform: 'translateX(0%)'}),
          animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
        ],
        {optional: true}
      )
    ])
  ];
}

function slideToLeft(): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
  const optional = {optional: true};
  return [
    /* order */
    /* 1 */ query(
      ':enter, :leave',
      style({position: 'fixed', width: '100%'}),
      {optional: true}
    ),
    /* 2 */ group([
      // block executes in parallel
      query(
        ':enter',
        [
          style({transform: 'translateX(-100%)'}),
          animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
        ],
        {optional: true}
      ),
      query(
        ':leave',
        [
          style({transform: 'translateX(0%)'}),
          animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
        ],
        {optional: true}
      )
    ])
  ];
}

export const shake = [
  trigger('shake', [
    transition('* => *', animate('1000ms ease-in', keyframes([
      style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
      style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
      style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
      style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
      style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
      style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
      style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
      style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
      style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
      style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
      style({ transform: 'translate3d(0, 0, 0)', offset: 1 })
    ]))),
  ])];
