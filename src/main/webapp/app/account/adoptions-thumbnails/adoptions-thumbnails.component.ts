import {Component, Input} from '@angular/core';
import {AdoptionMySuffix} from '../../entities/adoption/adoption-my-suffix.model';

@Component({
    selector: 'jhi-adoptions-thumbnails',
    templateUrl: './adoptions-thumbnails.component.html'
})
export class AdoptionsThumbnailsComponent {

    @Input() adoptions: AdoptionMySuffix[];

    constructor() {}
}
