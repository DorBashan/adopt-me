import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdoptMeSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {FeedComponent} from './feed/feed.component';
import {SearchAnimalComponent} from './feed/search/search-animal.component';
import {FeedResolvePagingParams} from './feed/feed.route';

@NgModule({
    imports: [
        AdoptMeSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
        FeedComponent,
        SearchAnimalComponent
    ],
    entryComponents: [
    ],
    providers: [
        FeedResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeHomeModule {}
