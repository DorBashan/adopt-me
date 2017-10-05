export const DEFAULT_ANIMAL_TYPE = 'Type';
export const DEFAULT_ANIMAL_SIZE = 'Size';
export const DEFAULT_ANIMAL_COLOR = 'Color';
export const DEFAULT_ANIMAL_GENDER = 'Gender';

export class SearchModel {

    constructor(
        public description?: string,
        public type?: string,
        public size?: string,
        public color?: string,
        public gender?: string

    ) {
        this.description = '';
        this.type = DEFAULT_ANIMAL_TYPE;
        this.size = DEFAULT_ANIMAL_SIZE;
        this.color = DEFAULT_ANIMAL_COLOR;
        this.gender = DEFAULT_ANIMAL_GENDER;
    }

    DEFAULT_ANIMAL_TYPE() {
        return DEFAULT_ANIMAL_TYPE;
    }

    DEFAULT_ANIMAL_SIZE() {
        return DEFAULT_ANIMAL_SIZE;
    }

    DEFAULT_ANIMAL_COLOR() {
        return DEFAULT_ANIMAL_COLOR;
    }

    DEFAULT_ANIMAL_GENDER() {
        return DEFAULT_ANIMAL_GENDER;
    }
}
