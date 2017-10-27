import { Routes } from '@angular/router';
import {
    activateRoute,
    passwordRoute,
    registerRoute,
    settingsRoute
} from './';
import {myAdoptionsRoute} from './my-adoptions/my-adoptions.route';
import {myFavoritesRoute} from './my-favorites/my-favorites.route';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    registerRoute,
    settingsRoute,
    myAdoptionsRoute,
    myFavoritesRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
