import { BaseEntity } from './../../shared';
import {User} from '../../shared/user/user.model';

export class AdoptMeUserMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public location?: string,
        public phone?: string,
        public user?: User
    ) {
    }
}
