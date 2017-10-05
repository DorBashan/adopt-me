import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AnimalMySuffixComponent } from './animal-my-suffix.component';
import { AnimalMySuffixDetailComponent } from './animal-my-suffix-detail.component';
import { AnimalMySuffixPopupComponent } from './animal-my-suffix-dialog.component';
import { AnimalMySuffixDeletePopupComponent } from './animal-my-suffix-delete-dialog.component';

export const animalRoute: Routes = [
    {
        path: 'animal-my-suffix',
        component: AnimalMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'animal-my-suffix/:id',
        component: AnimalMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const animalPopupRoute: Routes = [
    {
        path: 'animal-my-suffix-new',
        component: AnimalMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'animal-my-suffix/:id/edit',
        component: AnimalMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'animal-my-suffix/:id/delete',
        component: AnimalMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
