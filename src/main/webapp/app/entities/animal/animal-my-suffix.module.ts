import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptMeSharedModule } from '../../shared';

import {
    AnimalMySuffixService,
    AnimalMySuffixPopupService,
    AnimalMySuffixComponent,
    AnimalMySuffixDetailComponent,
    AnimalMySuffixDialogComponent,
    AnimalMySuffixPopupComponent,
    AnimalMySuffixDeletePopupComponent,
    AnimalMySuffixDeleteDialogComponent,
    animalRoute,
    animalPopupRoute,
} from './';
import {AdoptionCommentsComponent} from '../comments/adoption-comments/adoption-comments.component';

const ENTITY_STATES = [
    ...animalRoute,
    ...animalPopupRoute,
];

@NgModule({
    imports: [
        AdoptMeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AnimalMySuffixComponent,
        AnimalMySuffixDetailComponent,
        AnimalMySuffixDialogComponent,
        AnimalMySuffixDeleteDialogComponent,
        AnimalMySuffixPopupComponent,
        AnimalMySuffixDeletePopupComponent,
        AdoptionCommentsComponent
    ],
    entryComponents: [
        AnimalMySuffixComponent,
        AnimalMySuffixDialogComponent,
        AnimalMySuffixPopupComponent,
        AnimalMySuffixDeleteDialogComponent,
        AnimalMySuffixDeletePopupComponent,
    ],
    providers: [
        AnimalMySuffixService,
        AnimalMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeAnimalMySuffixModule {}
