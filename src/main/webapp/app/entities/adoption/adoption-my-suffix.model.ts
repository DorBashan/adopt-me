import { BaseEntity } from './../../shared';
import {AnimalMySuffix} from '../animal/animal-my-suffix.model';

export class AdoptionMySuffix implements BaseEntity {
    private _animal?: AnimalMySuffix;
    private _commentsCount: number;
    private _likesCount: number;

    constructor(
        public id?: number,
        public giverId?: number,
        public animalId?: number,
    ) {}

    get animal(): AnimalMySuffix {
        return this._animal;
    }

    set animal(value: AnimalMySuffix) {
        this._animal = value;
    }

    get likesCount(): number {
        return this._likesCount;
    }

    set likesCount(value: number) {
        this._likesCount = value;
    }
    get commentsCount(): number {
        return this._commentsCount;
    }

    set commentsCount(value: number) {
        this._commentsCount = value;
    }
}
