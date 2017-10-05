import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptMeSharedModule } from '../../shared';
import {
    AdoptMeUserMySuffixService,
    AdoptMeUserMySuffixPopupService,
    AdoptMeUserMySuffixComponent,
    AdoptMeUserMySuffixDetailComponent,
    AdoptMeUserMySuffixDialogComponent,
    AdoptMeUserMySuffixPopupComponent,
    AdoptMeUserMySuffixDeletePopupComponent,
    AdoptMeUserMySuffixDeleteDialogComponent,
    adoptMeUserRoute,
    adoptMeUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...adoptMeUserRoute,
    ...adoptMeUserPopupRoute,
];

@NgModule({
    imports: [
        AdoptMeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AdoptMeUserMySuffixComponent,
        AdoptMeUserMySuffixDetailComponent,
        AdoptMeUserMySuffixDialogComponent,
        AdoptMeUserMySuffixDeleteDialogComponent,
        AdoptMeUserMySuffixPopupComponent,
        AdoptMeUserMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AdoptMeUserMySuffixComponent,
        AdoptMeUserMySuffixDialogComponent,
        AdoptMeUserMySuffixPopupComponent,
        AdoptMeUserMySuffixDeleteDialogComponent,
        AdoptMeUserMySuffixDeletePopupComponent,
    ],
    providers: [
        AdoptMeUserMySuffixService,
        AdoptMeUserMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeAdoptMeUserMySuffixModule {}
