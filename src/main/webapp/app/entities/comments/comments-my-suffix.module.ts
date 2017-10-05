import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptMeSharedModule } from '../../shared';
import {
    CommentsMySuffixService,
    CommentsMySuffixPopupService,
    CommentsMySuffixComponent,
    CommentsMySuffixDetailComponent,
    CommentsMySuffixDialogComponent,
    CommentsMySuffixPopupComponent,
    CommentsMySuffixDeletePopupComponent,
    CommentsMySuffixDeleteDialogComponent,
    commentsRoute,
    commentsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commentsRoute,
    ...commentsPopupRoute,
];

@NgModule({
    imports: [
        AdoptMeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CommentsMySuffixComponent,
        CommentsMySuffixDetailComponent,
        CommentsMySuffixDialogComponent,
        CommentsMySuffixDeleteDialogComponent,
        CommentsMySuffixPopupComponent,
        CommentsMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CommentsMySuffixComponent,
        CommentsMySuffixDialogComponent,
        CommentsMySuffixPopupComponent,
        CommentsMySuffixDeleteDialogComponent,
        CommentsMySuffixDeletePopupComponent
    ],
    providers: [
        CommentsMySuffixService,
        CommentsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeCommentsMySuffixModule {}
