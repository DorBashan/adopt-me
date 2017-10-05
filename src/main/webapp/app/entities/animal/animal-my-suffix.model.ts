import { BaseEntity } from './../../shared';

const enum AnimalType {
    'DOG',
    'CAT',
    'FISH',
    'HAMSTER',
    'PARROT'
}

const enum AnimalColor {
    'BROWN',
    'BLACK',
    'GINGER',
    'COLORFUL',
    'GREEN',
    'WHITE',
    'GREY'
}

const enum AnimalSize {
    'HUGE',
    'BIG',
    'MEDIUM',
    'SMALL'
}

const enum AnimalGender {
    'MALE',
    'FEMALE'
}

export class AnimalMySuffix implements BaseEntity {
    private _image: any;

    constructor(
        public id?: number,
        public animalName?: string,
        public animalType?: AnimalType,
        public animalColor?: AnimalColor,
        public animalSize?: AnimalSize,
        public imageUrl?: string,
        public birthDate?: any,
        public shortDescription?: string,
        public longDescription?: string,
        public isTrained?: boolean,
        public animalGender?: AnimalGender,
    ) {
        this.isTrained = false;
    }

    get image(): any {
        return this._image;
    }

    set image(value: any) {
        this._image = value;
    }
}
