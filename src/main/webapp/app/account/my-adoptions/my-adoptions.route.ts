import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import {MyAdoptionsComponent} from './my-adoptions.component';

export const myAdoptionsRoute: Route = {
    path: 'my-adoptions',
    component: MyAdoptionsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'My Adoptions'
    },
    canActivate: [UserRouteAccessService]
};
