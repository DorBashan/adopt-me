import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AdoptionMySuffixComponent } from './adoption-my-suffix.component';
import { AdoptionMySuffixDetailComponent } from './adoption-my-suffix-detail.component';
import { AdoptionMySuffixPopupComponent } from './adoption-my-suffix-dialog.component';
import { AdoptionMySuffixDeletePopupComponent } from './adoption-my-suffix-delete-dialog.component';

export const adoptionRoute: Routes = [
    {
        path: 'adoption-my-suffix',
        component: AdoptionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adoptions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'adoption-my-suffix/:id',
        component: AdoptionMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adoptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adoptionPopupRoute: Routes = [
    {
        path: 'adoption-my-suffix-new',
        component: AdoptionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adoptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'adoption-my-suffix/:id/edit',
        component: AdoptionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adoptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'adoption-my-suffix/:id/delete',
        component: AdoptionMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adoptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
