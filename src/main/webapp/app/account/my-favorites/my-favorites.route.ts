import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import {MyFavoritesComponent} from './my-favorites.component';

export const myFavoritesRoute: Route = {
    path: 'my-favorites',
    component: MyFavoritesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'My Favorites'
    },
    canActivate: [UserRouteAccessService]
};
