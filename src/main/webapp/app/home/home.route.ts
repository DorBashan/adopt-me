import { Route } from '@angular/router';

import { HomeComponent } from './';
import {FeedResolvePagingParams} from './feed/feed.route';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    resolve: {
        'pagingParams': FeedResolvePagingParams
    },
    data: {
        authorities: [],
        pageTitle: 'AdoptMe'
    }
};
