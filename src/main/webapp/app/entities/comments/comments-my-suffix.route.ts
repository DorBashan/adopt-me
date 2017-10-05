import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CommentsMySuffixComponent } from './comments-my-suffix.component';
import { CommentsMySuffixDetailComponent } from './comments-my-suffix-detail.component';
import { CommentsMySuffixPopupComponent } from './comments-my-suffix-dialog.component';
import { CommentsMySuffixDeletePopupComponent } from './comments-my-suffix-delete-dialog.component';

export const commentsRoute: Routes = [
    {
        path: 'comments-my-suffix',
        component: CommentsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comments-my-suffix/:id',
        component: CommentsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentsPopupRoute: Routes = [
    {
        path: 'comments-my-suffix-new',
        component: CommentsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comments-my-suffix/:id/edit',
        component: CommentsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comments-my-suffix/:id/delete',
        component: CommentsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
