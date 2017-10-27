import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptMeSharedModule } from '../shared';

import {
    Register,
    ActivateService,
    PasswordService,
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    SettingsComponent,
    accountState,
    MyAdoptionsComponent,
    MyFavoritesComponent,
    AdoptionsThumbnailsComponent
} from './';

@NgModule({
    imports: [
        AdoptMeSharedModule,
        RouterModule.forRoot(accountState, { useHash: true })
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        SettingsComponent,
        MyAdoptionsComponent,
        MyFavoritesComponent,
        AdoptionsThumbnailsComponent
    ],
    providers: [
        Register,
        ActivateService,
        PasswordService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeAccountModule {}
