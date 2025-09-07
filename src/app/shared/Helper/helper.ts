import { trigger, transition, style, animate } from "@angular/animations";

export const fadeInOut =  trigger('fadeInOut',[
    transition(':enter',[
        style({opacity:0}),
        animate('1500ms',
          style({opacity:1})
        )
    ]),
    transition(':leave',[
        style({opacity:1}),
        animate('10ms',
          style({opacity:0})
        )
    ])
])
