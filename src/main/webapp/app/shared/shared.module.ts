import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    AdoptMeSharedLibsModule,
    AdoptMeSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
     UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent,
     FileService
} from './';

@NgModule({
    imports: [
        AdoptMeSharedLibsModule,
        AdoptMeSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
         UserService,
        DatePipe,
         FileService
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        AdoptMeSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AdoptMeSharedModule {}
