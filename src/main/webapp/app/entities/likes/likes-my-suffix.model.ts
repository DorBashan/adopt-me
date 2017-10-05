import { BaseEntity } from './../../shared';

export class LikesMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public adoptionId?: number,
    ) {
    }
}
