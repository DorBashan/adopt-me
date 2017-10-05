import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptMeSharedModule } from '../../shared';
import {
    LikesMySuffixService,
    LikesMySuffixPopupService,
    LikesMySuffixComponent,
    LikesMySuffixDetailComponent,
    LikesMySuffixDialogComponent,
    LikesMySuffixPopupComponent,
    LikesMySuffixDeletePopupComponent,
    LikesMySuffixDeleteDialogComponent,
    likesRoute,
    likesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...likesRoute,
    ...likesPopupRoute,
];

@NgModule({
    imports: [
        AdoptMeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LikesMySuffixComponent,
        LikesMySuffixDetailComponent,
        LikesMySuffixDialogComponent,
        LikesMySuffixDeleteDialogComponent,
        LikesMySuffixPopupComponent,
        LikesMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LikesMySuffixComponent,
        LikesMySuffixDialogComponent,
        LikesMySuffixPopupComponent,
        LikesMySuffixDeleteDialogComponent,
        LikesMySuffixDeletePopupComponent,
    ],
    providers: [
        LikesMySuffixService,
        LikesMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeLikesMySuffixModule {}
