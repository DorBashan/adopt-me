import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LikesMySuffixComponent } from './likes-my-suffix.component';
import { LikesMySuffixDetailComponent } from './likes-my-suffix-detail.component';
import { LikesMySuffixPopupComponent } from './likes-my-suffix-dialog.component';
import { LikesMySuffixDeletePopupComponent } from './likes-my-suffix-delete-dialog.component';

export const likesRoute: Routes = [
    {
        path: 'likes-my-suffix',
        component: LikesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Likes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'likes-my-suffix/:id',
        component: LikesMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Likes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const likesPopupRoute: Routes = [
    {
        path: 'likes-my-suffix-new',
        component: LikesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Likes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'likes-my-suffix/:id/edit',
        component: LikesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Likes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'likes-my-suffix/:id/delete',
        component: LikesMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Likes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
