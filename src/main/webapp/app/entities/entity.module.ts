import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdoptMeAnimalMySuffixModule } from './animal/animal-my-suffix.module';
import { AdoptMeAdoptMeUserMySuffixModule } from './adopt-me-user/adopt-me-user-my-suffix.module';
import { AdoptMeAdoptionMySuffixModule } from './adoption/adoption-my-suffix.module';
import { AdoptMeLikesMySuffixModule } from './likes/likes-my-suffix.module';
import { AdoptMeCommentsMySuffixModule } from './comments/comments-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AdoptMeAnimalMySuffixModule,
        AdoptMeAdoptMeUserMySuffixModule,
        AdoptMeAdoptionMySuffixModule,
        AdoptMeLikesMySuffixModule,
        AdoptMeCommentsMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdoptMeEntityModule {}
