import { BaseEntity } from './../../shared';
import {AdoptMeUserMySuffix} from '../adopt-me-user/adopt-me-user-my-suffix.model';
import {User} from '../../shared/user/user.model';

export class CommentsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public date?: any,
        public userId?: number,
        public adoptionId?: number,
        public adoptMeUser?: User
    ) {
    }
}
