import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AdoptMeUserMySuffixComponent } from './adopt-me-user-my-suffix.component';
import { AdoptMeUserMySuffixDetailComponent } from './adopt-me-user-my-suffix-detail.component';
import { AdoptMeUserMySuffixPopupComponent } from './adopt-me-user-my-suffix-dialog.component';
import { AdoptMeUserMySuffixDeletePopupComponent } from './adopt-me-user-my-suffix-delete-dialog.component';

export const adoptMeUserRoute: Routes = [
    {
        path: 'adopt-me-user-my-suffix',
        component: AdoptMeUserMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AdoptMeUsers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'adopt-me-user-my-suffix/:id',
        component: AdoptMeUserMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AdoptMeUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adoptMeUserPopupRoute: Routes = [
    {
        path: 'adopt-me-user-my-suffix-new',
        component: AdoptMeUserMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AdoptMeUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'adopt-me-user-my-suffix/:id/edit',
        component: AdoptMeUserMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AdoptMeUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'adopt-me-user-my-suffix/:id/delete',
        component: AdoptMeUserMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AdoptMeUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
