import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptMeSharedModule } from '../../shared';
import {
    AdoptionMySuffixService,
    AdoptionMySuffixPopupService,
    AdoptionMySuffixComponent,
    AdoptionMySuffixDetailComponent,
    AdoptionMySuffixDialogComponent,
    AdoptionMySuffixPopupComponent,
    AdoptionMySuffixDeletePopupComponent,
    AdoptionMySuffixDeleteDialogComponent,
    AdoptionPopulatorService,
    adoptionRoute,
    adoptionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...adoptionRoute,
    ...adoptionPopupRoute,
];

@NgModule({
    imports: [
        AdoptMeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AdoptionMySuffixComponent,
        AdoptionMySuffixDetailComponent,
        AdoptionMySuffixDialogComponent,
        AdoptionMySuffixDeleteDialogComponent,
        AdoptionMySuffixPopupComponent,
        AdoptionMySuffixDeletePopupComponent
    ],
    entryComponents: [
        AdoptionMySuffixComponent,
        AdoptionMySuffixDialogComponent,
        AdoptionMySuffixPopupComponent,
        AdoptionMySuffixDeleteDialogComponent,
        AdoptionMySuffixDeletePopupComponent
    ],
    providers: [
        AdoptionMySuffixService,
        AdoptionMySuffixPopupService,
        AdoptionPopulatorService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeAdoptionMySuffixModule {}
